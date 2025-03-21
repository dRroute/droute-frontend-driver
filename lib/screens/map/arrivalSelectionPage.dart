import 'package:flutter/material.dart';
import 'package:google_maps_flutter/google_maps_flutter.dart';
import 'package:geolocator/geolocator.dart';
import 'package:google_place/google_place.dart';
import 'package:geocoding/geocoding.dart';

class ArrivalLocationSelectionPage extends StatefulWidget {
  const ArrivalLocationSelectionPage({super.key});

  @override
  State<ArrivalLocationSelectionPage> createState() => _ArrivalLocationSelectionPageState();
}

class _ArrivalLocationSelectionPageState extends State<ArrivalLocationSelectionPage> {
  final TextEditingController _searchController = TextEditingController();
  GoogleMapController? _mapController;
  LatLng? _currentLocation;
  LatLng? _selectedLocation;
  bool _locationPermissionGranted = false;
  List<AutocompletePrediction> _searchResults = [];
  late GooglePlace _googlePlace;

  @override
  void initState() {
    super.initState();
    _googlePlace = GooglePlace("AIzaSyAEqA9xxuXpegQ98gpVjkOis3xYMAzPNQI");
    _getCurrentLocation();
  }

  Future<void> _getCurrentLocation() async {
    LocationPermission permission = await Geolocator.requestPermission();
    if (permission == LocationPermission.denied || permission == LocationPermission.deniedForever) {
      Navigator.pop(context);
      return;
    }
    _locationPermissionGranted = true;
    Position position = await Geolocator.getCurrentPosition(desiredAccuracy: LocationAccuracy.high);
    setState(() {
      _currentLocation = LatLng(position.latitude, position.longitude);
    });
  }

  void _searchPlaces(String query) async {
    if (query.isEmpty) {
      setState(() => _searchResults = []);
      return;
    }
    var result = await _googlePlace.autocomplete.get(query);
    if (result?.predictions != null) {
      setState(() => _searchResults = result!.predictions!);
    }
  }

  void _selectLocation(AutocompletePrediction prediction) async {
    String? placeId = prediction.placeId;
    if (placeId == null) return;

    var details = await _googlePlace.details.get(placeId);
    if (details?.result?.geometry?.location != null) {
      double lat = details!.result!.geometry!.location!.lat!;
      double lng = details.result!.geometry!.location!.lng!;
      LatLng newLocation = LatLng(lat, lng);

      setState(() {
        _selectedLocation = newLocation;
        _searchController.text = prediction.description ?? "";
        _searchResults = [];
      });
      _mapController?.animateCamera(CameraUpdate.newLatLng(newLocation));
    }
  }

  void _confirmSelection() async {
    if (_selectedLocation != null) {
      try {
        // Reverse geocode to get the address
        List<Placemark> placemarks = await placemarkFromCoordinates(
          _selectedLocation!.latitude,
          _selectedLocation!.longitude,
        );
        if (placemarks.isNotEmpty) {
          Placemark place = placemarks.first;

          String address = "${place.name}, ${place.street}, ${place.subLocality}, ${place.locality}, "
              "${place.administrativeArea}, ${place.postalCode}, ${place.country}";
          // Navigate back with address and coordinates
          Navigator.pop(context, {
            'coordinates': '${_selectedLocation!.latitude},${_selectedLocation!.longitude}',
            'address': address,
          });
        } else {
          print("No address found");
        }
      } catch (e) {
        print("Error fetching address: $e");
      }
    }
  }
  void _goToCurrentLocation() {
    if (_currentLocation != null) {
      _mapController?.animateCamera(
        CameraUpdate.newLatLng(_currentLocation!),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(

      body: Stack(
        children: [
          Positioned.fill(
            child: GoogleMap(
              initialCameraPosition: CameraPosition(
                target: _currentLocation ?? LatLng(18.4679772, 73.836784),
                zoom: 15,
              ),
              onMapCreated: (controller) => _mapController = controller,
              myLocationButtonEnabled: false,
              myLocationEnabled: true,
              markers: {
                if (_selectedLocation != null)
                  Marker(
                    markerId: const MarkerId("selected_location"),
                    position: _selectedLocation!,
                    icon: BitmapDescriptor.defaultMarker,
                  ),
              },
              onTap: (LatLng tappedPoint) {
                setState(() => _selectedLocation = tappedPoint);
              },
            ),
          ),
          Positioned(
            top: 40,
            left: 15,
            right: 15,
            child: Column(
              children: [
                Container(
                  decoration: BoxDecoration(
                    color: Colors.white, // Background color
                    borderRadius: BorderRadius.circular(8), // Rounded corners
                    boxShadow: [
                      BoxShadow(
                        color: Colors.black.withOpacity(0.2), // Shadow color with transparency
                        blurRadius: 6, // Soft shadow blur
                        spreadRadius: 2, // Spread to extend the shadow
                        offset: Offset(0, 3), // Move shadow slightly down
                      ),
                    ],
                  ),
                  child: TextField(
                    controller: _searchController,
                    onChanged: _searchPlaces,
                    decoration: InputDecoration(
                      hintText: "Search location...",
                      prefixIcon: Icon(Icons.search, color: Colors.black54),
                      filled: true,
                      fillColor: Colors.white,
                      border: OutlineInputBorder(
                        borderRadius: BorderRadius.circular(8),
                        borderSide: BorderSide.none,
                      ),
                    ),
                  ),
                ),

                if (_searchResults.isNotEmpty)
                  Container(
                    margin: EdgeInsets.only(top: 5),
                    height: 300,

                    decoration: BoxDecoration(
                      color: Colors.white,
                      boxShadow: [
                        BoxShadow(
                          color: Colors.black.withOpacity(0.1),
                          blurRadius: 5,
                          spreadRadius: 1,
                          offset: Offset(0, 2),
                        ),
                      ],
                    ),
                    child: ListView(
                      children: _searchResults.map((prediction) => ListTile(
                        title: Text(prediction.description ?? ""),
                        onTap: () => _selectLocation(prediction),
                      )).toList(),
                    ),
                  ),
              ],
            ),
          ),
          Positioned(
            bottom: 110,
            right: 12,
            child: FloatingActionButton(
              onPressed: _goToCurrentLocation,
              backgroundColor: Colors.white,
              child: Icon(Icons.my_location, color: Colors.blue),
            ),
          ),
          Positioned(
            bottom: 20,
            left: 12,
            child: ElevatedButton(
              onPressed: _confirmSelection,
              style: ElevatedButton.styleFrom(
                backgroundColor: Colors.teal.shade50, // Light teal background
                shadowColor: Colors.black, // Shadow color
                elevation: 5, // Shadow depth
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(8), // Rounded corners
                  side: BorderSide(color: Colors.teal, width: 2), // Border color & width
                ),
                padding: EdgeInsets.symmetric(horizontal: 16, vertical: 12), // Button padding
              ),
              child: Text(
                "Select Arrival Location",
                style: TextStyle(
                  color: Colors.teal[900], // Darker text color for contrast
                  fontWeight: FontWeight.bold,
                ),
              ),
            ),
          ),

        ],
      ),
    );
  }
}
