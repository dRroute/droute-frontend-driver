import 'package:flutter/material.dart';
import 'package:google_maps_flutter/google_maps_flutter.dart';

class MapPage extends StatefulWidget {
  @override
  _MapPageState createState() => _MapPageState();
}

class _MapPageState extends State<MapPage> {
  late BitmapDescriptor customIcon;

  final LatLng vanLocation = LatLng(18.465932, 73.834730);
  final LatLng destLocation = LatLng(18.469118, 73.834063);

  @override
  void initState() {
    super.initState();
    _loadCustomMarker();
  }

  void _loadCustomMarker() async {
    customIcon = await BitmapDescriptor.fromAssetImage(
      const ImageConfiguration(size: Size(20, 20)), // Adjust size
      'assets/images/MapMarker.png',
    );
    setState(() {}); // Refresh UI
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: GoogleMap(
        initialCameraPosition: CameraPosition(target: vanLocation, zoom: 13),
        markers:
            customIcon == null
                ? {}
                : {
                  Marker(
                    markerId: MarkerId("van_marker"),
                    position: vanLocation,
                    icon: customIcon,
                  ),
                  Marker(
                    markerId: MarkerId("destination_marker"),
                    position: destLocation,
                    icon:
                        BitmapDescriptor
                            .defaultMarker, // Default marker for destination
                  ),
                },
      ),
    );
  }
}
