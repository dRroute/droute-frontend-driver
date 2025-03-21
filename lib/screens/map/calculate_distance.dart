import 'dart:convert';
import 'package:flutter/material.dart';
import 'dart:math';
import 'package:http/http.dart' as http;

class CalculateDistance extends StatefulWidget {
  @override
  _CalculateDistanceState createState() => _CalculateDistanceState();
}

class _CalculateDistanceState extends State<CalculateDistance> {
  String apiKey = "AIzaSyAEqA9xxuXpegQ98gpVjkOis3xYMAzPNQI";
  String distance = "Click the button to calculate nearest distance";
  List<dynamic> routeCoordinates = [];

  @override
  void initState() {
    super.initState();
    getRouteCoordinates();
  }

  // Fetching route coordinates from API
  Future<void> getRouteCoordinates() async {
    // Coordinates
    double sourceLat = 18.4651293;
    double sourceLng = 73.832268;
    double destLat = 18.5707793;
    double destLng = 73.7595939;

    // Construct the API URL
    String url = "https://maps.googleapis.com/maps/api/directions/json?origin=$sourceLat,$sourceLng&destination=$destLat,$destLng&key=$apiKey";
    // Make the HTTP request
    var response = await http.get(Uri.parse(url));
    if (response.statusCode == 200) {
      // Parse the JSON response
      var data = json.decode(response.body);
      var routes = data['routes'];
      if (routes.isNotEmpty) {
        var legs = routes[0]['legs'];
        var steps = legs[0]['steps'];
        setState(() {
          routeCoordinates = steps.map((step) {
            return {
              'lat': step['end_location']['lat'],
              'lng': step['end_location']['lng']
            };
          }).toList();
        });
      }
    } else {
      // If the request failed, show an error
      setState(() {
        distance = "Error fetching coordinates";
      });
    }
  }

  // Haversine formula to calculate distance between two coordinates
  double haversine(double lat1, double lon1, double lat2, double lon2) {
    const double R = 6371; // Radius of the Earth in km
    double phi1 = lat1 * 3.141592653589793 / 180;  // Convert latitude to radians
    double phi2 = lat2 * 3.141592653589793 / 180;  // Convert latitude to radians
    double deltaPhi = (lat2 - lat1) * 3.141592653589793 / 180;  // Difference in latitude
    double deltaLambda = (lon2 - lon1) * 3.141592653589793 / 180;  // Difference in longitude

    double a = sin(deltaPhi / 2) * sin(deltaPhi / 2) + cos(phi1) * cos(phi2) * sin(deltaLambda / 2) * sin(deltaLambda / 2);
    double c = 2 * atan2(sqrt(a), sqrt(1 - a));
    return R * c; // Distance in kilometers
  }
  // Method to calculate the nearest distance from user to road coordinates
  void calculateNearestDistance(double userLat, double userLng) {
    double nearestDistance = double.infinity;
    double nearestLat = 0;
    double nearestLng = 0;

    for (var point in routeCoordinates) {
      double lat = point['lat'];
      double lng = point['lng'];
      double distanceToUser = haversine(userLat, userLng, lat, lng);
      if (distanceToUser < nearestDistance) {
        nearestDistance = distanceToUser;
        nearestLat = lat;
        nearestLng = lng;
      }
    }

    setState(() {
      distance = "Nearest Distance: ${nearestDistance.toStringAsFixed(2)} km";
    });

    print("Nearest distance to user: ${nearestDistance.toStringAsFixed(2)} km");
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Calculate Nearest Distance'),
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Text(
              distance,
              style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
            ),
            SizedBox(height: 20),
            ElevatedButton(
              onPressed: () {
                // User's coordinates
                double userLat = 18.7573613;
                double userLng = 73.370523;
                calculateNearestDistance(userLat, userLng);
              },
              child: Text("Calculate Nearest Distance"),
            ),
          ],
        ),
      ),
    );
  }
}

