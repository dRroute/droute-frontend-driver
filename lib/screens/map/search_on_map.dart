import 'package:flutter/material.dart';
import 'package:google_maps_flutter/google_maps_flutter.dart';
import 'package:geolocator/geolocator.dart';
import 'package:google_place/google_place.dart';

class SearchOnMap extends StatefulWidget {
  const SearchOnMap({super.key});

  @override
  State<SearchOnMap> createState() => _SearchOnMapState();
}

class _SearchOnMapState extends State<SearchOnMap> {
  final TextEditingController _searchController = TextEditingController();
  GoogleMapController? _mapController;
  LatLng? _currentLocation;
  LatLng? _searchedLocation;
  LatLng? _selectedByUser;
  bool _locationPermissionGranted = false;
  List<AutocompletePrediction> _searchResults = [];
  Marker? selectedMarker;

  late GooglePlace _googlePlace;

  @override
  void initState() {
    super.initState();
    _googlePlace = GooglePlace("AIzaSyAEqA9xxuXpegQ98gpVjkOis3xYMAzPNQI");
    _getCurrentLocation();
  }

  Future<void> _getCurrentLocation() async {
    LocationPermission permission = await Geolocator.requestPermission();
    if (permission == LocationPermission.denied ||
        permission == LocationPermission.deniedForever) {
      Navigator.pop(context); // Go back if permission is denied
      return;
    }
    _locationPermissionGranted = true;
    Position position = await Geolocator.getCurrentPosition(
      desiredAccuracy: LocationAccuracy.high,
    );
    setState(() {
      _currentLocation = LatLng(position.latitude!, position.longitude!);

     print("This is current position $_currentLocation");

    });
  }

  void _searchPlaces(String query) async {
    if (query.isEmpty) {
      setState(() {
        _searchResults = [];
      });
      return;
    }

    var result = await _googlePlace.autocomplete.get(query);
    if (result != null && result.predictions != null) {
      setState(() {
        _searchResults = result.predictions!;
      });
    }
  }

  void _selectLocation(AutocompletePrediction prediction) async {
    String? placeId = prediction.placeId;
    if (placeId == null) return;

    var details = await _googlePlace.details.get(placeId);
    if (details != null && details.result != null) {
      double lat = details.result!.geometry!.location!.lat!;
      double lng = details.result!.geometry!.location!.lng!;
      LatLng newLocation = LatLng(lat, lng);

      setState(() {
        _selectedByUser=newLocation;
        _searchedLocation = newLocation;
        _searchController.text = prediction.description!;
        _searchResults = [];
      });
         // print(newLocation);
      _mapController?.animateCamera(CameraUpdate.newLatLng(newLocation));
    }
  }
  void _onMapTapped(LatLng tappedPoint) {
    setState(() {
      // _searchedLocation= tappedPoint;
      _selectedByUser = tappedPoint;
      selectedMarker = Marker(
        markerId: const MarkerId("selected-point"),
        position: tappedPoint,
        icon: BitmapDescriptor.defaultMarkerWithHue(BitmapDescriptor.hueCyan),
      );
    });

    // Print selected location in console
    print("Selected Location: ${tappedPoint.latitude}, ${tappedPoint.longitude}");
  }
  void _goToCurrentLocation() {
    if (_currentLocation != null) {
      _mapController?.animateCamera(
        CameraUpdate.newLatLng(_currentLocation!),
      );
    }
  }
  void _handleMapTap(LatLng tappedPoint) {
    setState(() {
      _onMapTapped(tappedPoint); // Handle the tap event
      _searchResults.clear(); // Clear search results
    });
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
                zoom: 15, // Adjusted for visibility
              ),
              onMapCreated: (controller) => _mapController = controller,
              myLocationEnabled: _locationPermissionGranted,
              myLocationButtonEnabled: false, // Disabled default button
              mapType: MapType.satellite,
              markers: {
                if (_searchedLocation != null)
                  Marker(
                    markerId: const MarkerId("searched_location"),
                    position: _searchedLocation!,
                    icon: BitmapDescriptor.defaultMarker,
                  ),
                if (selectedMarker != null) selectedMarker!,
              },
              onTap: _handleMapTap,
            ),
          ),

          // Search Box
          Positioned(
            top: 40,
            left: 15,
            right: 15,
            child: Column(
              children: [
                TextField(
                  controller: _searchController,
                  onChanged: _searchPlaces,
                  decoration: InputDecoration(
                    hintText: "Search location...",
                    prefixIcon: Icon(Icons.search, color: Colors.black54),
                    filled: true,
                    fillColor: Colors.white,
                    border: OutlineInputBorder(
                      borderRadius: BorderRadius.circular(4),
                      borderSide: BorderSide.none,
                    ),
                  ),
                ),
                if (_searchResults.isNotEmpty)
                  Container(
                    margin: const EdgeInsets.only(top: 5),
                    height: 200,
                    color: Colors.white,
                    child: ListView(
                      children: _searchResults
                          .map(
                            (prediction) => ListTile(
                          title: Text(prediction.description ?? ""),
                          onTap: () => _selectLocation(prediction),
                        ),
                      )
                          .toList(),
                    ),
                  ),
              ],
            ),
          ),

          // Custom Current Location Button
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
              onPressed: () {
                print(_selectedByUser);
              },
              style: ElevatedButton.styleFrom(
                backgroundColor: Colors.white, // Button background
                foregroundColor: Colors.black, // Text color
                padding: EdgeInsets.symmetric(horizontal: 24, vertical: 12), // Size
                textStyle: TextStyle(fontSize: 20), // Font size
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(4),
                  side: BorderSide(color: Colors.grey), // Border color
                ),
              ),
              child: Text("Select"),
            ),
          ),

        ],
      ),
    );
  }



}
