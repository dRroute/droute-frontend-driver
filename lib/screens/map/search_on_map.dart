import 'package:flutter/material.dart';
import 'package:google_maps_flutter/google_maps_flutter.dart';
import 'package:geolocator/geolocator.dart';

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
  bool _locationPermissionGranted = false;

  final List<String> _dummyLocations = [
    "New York, NY",
    "Los Angeles, CA",
    "Chicago, IL",
    "San Francisco, CA",
  ];

  @override
  void initState() {
    super.initState();
    _getCurrentLocation();
  }

  Future<void> _getCurrentLocation() async {
    LocationPermission permission = await Geolocator.requestPermission();
    if (permission == LocationPermission.denied ||
        permission == LocationPermission.deniedForever) {
      return;
    }
    _locationPermissionGranted = true;
    Position position = await Geolocator.getCurrentPosition(
      desiredAccuracy: LocationAccuracy.high,
    );
    setState(() {
      _currentLocation = LatLng(position.latitude, position.longitude);
    });
  }

  void _onLocationSelected(String location) {
    // Mock coordinates (Replace this with actual geocoding API results)
    Map<String, LatLng> locationCoordinates = {
      "New York, NY": LatLng(40.7128, -74.0060),
      "Los Angeles, CA": LatLng(34.0522, -118.2437),
      "Chicago, IL": LatLng(41.8781, -87.6298),
      "San Francisco, CA": LatLng(37.7749, -122.4194),
    };

    setState(() {
      _searchedLocation = locationCoordinates[location];
      _searchController.text = location;
    });

    if (_mapController != null && _searchedLocation != null) {
      _mapController!.animateCamera(CameraUpdate.newLatLng(_searchedLocation!));
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Stack(
        children: [
          // Google Map
          Positioned.fill(
            child: GoogleMap(
              initialCameraPosition: CameraPosition(
                target: _currentLocation ?? LatLng(37.7749, -122.4194),
                // Default SF
                zoom: 500,
              ),
              onMapCreated: (controller) => _mapController = controller,
              myLocationEnabled: _locationPermissionGranted,
              myLocationButtonEnabled: true,
              mapType: MapType.satellite,
              // Set satellite view
              markers: {
                if (_searchedLocation != null)
                  Marker(
                    markerId: MarkerId("searched_location"),
                    position: _searchedLocation!,
                    icon: BitmapDescriptor.defaultMarker,
                  ),
              },
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
                  onChanged: (query) => setState(() {}),
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
                if (_searchController.text.isNotEmpty)
                  Container(
                    margin: const EdgeInsets.only(top: 5),
                    height: 150,
                    color: Colors.white,
                    child: ListView(
                      children:
                          _dummyLocations
                              .where(
                                (loc) => loc.toLowerCase().contains(
                                  _searchController.text.toLowerCase(),
                                ),
                              )
                              .map(
                                (location) => ListTile(
                                  title: Text(location),
                                  onTap: () => _onLocationSelected(location),
                                ),
                              )
                              .toList(),
                    ),
                  ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
