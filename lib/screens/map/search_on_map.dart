import 'package:flutter/material.dart';
import 'package:droute_driver_frontend/styles/color/app_color.dart';

class SearchOnMap extends StatefulWidget {
  const SearchOnMap({super.key});

  @override
  State<SearchOnMap> createState() => _SearchOnMapState();
}

class _SearchOnMapState extends State<SearchOnMap> {
  final TextEditingController _searchController = TextEditingController();
  List<String> _dummyLocations = [
    "123 Main Street, Springfield, IL 62704",
    "45 Elmwood Avenue, Brooklyn, NY 11215",
    "678 Oak Lane, Dallas, TX 75204",
    "89 Maple Drive, Los Angeles, CA 90001",
    "27 King Street, London, UK SW1A 1AA",
    "555 Silicon Valley Blvd, San Jose, CA 95134",
    "302 Palm Grove Road, Miami, FL 33101",
  ]; // Dummy data

  List<String> _filteredLocations = [];

  void _filterSearchResults(String query) {
    setState(() {
      _filteredLocations = query.isEmpty
          ? []
          : _dummyLocations
          .where((location) =>
          location.toLowerCase().contains(query.toLowerCase()))
          .toList();
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColor.primaryColor,
      body: SafeArea(
        child: Column(
          children: [
            Padding(
              padding: const EdgeInsets.all(16.0),
              child: TextField(
                controller: _searchController,
                onChanged: _filterSearchResults, // Calls function when typing
                decoration: InputDecoration(
                  hintText: "Search location...",
                  prefixIcon: const Icon(Icons.search, color: Colors.black54),
                  filled: true,
                  fillColor: Colors.white,
                  border: OutlineInputBorder(
                    borderRadius: BorderRadius.circular(4),
                    borderSide: BorderSide.none,
                  ),
                ),
              ),
            ),
            if (_filteredLocations.isNotEmpty)
              Expanded(
                child: ListView.builder(
                  itemCount: _filteredLocations.length,
                  itemBuilder: (context, index) {
                    return Container(
                      margin: const EdgeInsets.symmetric(vertical: 1, horizontal: 8),
                      decoration: BoxDecoration(
                        color: Colors.white, // White background
                        borderRadius: BorderRadius.circular(4), // Rounded corners
                        border: Border.all(color: Colors.grey.shade300, width: 1), // Light border
                        boxShadow: [
                          BoxShadow(
                            color: Colors.black12,
                            blurRadius: 3,
                            spreadRadius: 1,
                          ),
                        ],
                      ),
                      child: ListTile(
                        leading: Column(
                          mainAxisAlignment: MainAxisAlignment.center,
                          children: [
                            Icon(Icons.location_on, color: Colors.redAccent, size: 24), // Location icon
                            const SizedBox(height: 2), // Small spacing
                            Text(
                              "5 km", // Dummy distance
                              style: TextStyle(fontSize: 12, color: Colors.grey[600]), // Small font
                            ),
                          ],
                        ),
                        title: Text(
                          _filteredLocations[index],
                          style: const TextStyle(fontSize: 16, fontWeight: FontWeight.w500),
                        ),
                        onTap: () {
                          _searchController.text = _filteredLocations[index];
                          setState(() {
                            _filteredLocations = []; // Hide suggestions
                          });
                        },
                      ),
                    );

                  },
                ),
              ),

          ],
        ),
      ),
    );
  }
}
