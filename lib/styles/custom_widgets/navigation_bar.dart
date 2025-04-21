import 'package:flutter/material.dart';
import 'package:droute_driver_frontend/screens/driver/home.dart';
import 'package:droute_driver_frontend/screens/orders/requestedOrders.dart';
import 'package:droute_driver_frontend/screens/journey/journey_cards_page.dart';
import 'package:droute_driver_frontend/screens/driver/profile.dart';
import 'package:droute_driver_frontend/styles/color/app_color.dart';

class CustomNavigationBar extends StatefulWidget {
  @override
  _CustomNavigationBarState createState() => _CustomNavigationBarState();
}

class _CustomNavigationBarState extends State<CustomNavigationBar> {
  int _selectedIndex = 0;

  final List<Widget> _pages = [
    Home(),
    RequestedOrders(),
    JourneyCardsPage(),
    ProfileScreen(),
  ];

  final List<String> _titles = [
    'Home',
    'Orders',
    'Journey',
    'Profile',
  ];

  void _onItemTapped(int index) {
    setState(() {
      _selectedIndex = index;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
    
      body: _pages[_selectedIndex],
      bottomNavigationBar: BottomNavigationBar(
        currentIndex: _selectedIndex,
        onTap: _onItemTapped,
        selectedItemColor: AppColor.primaryColor, // Set the primary color for selected item
        unselectedItemColor: Colors.grey, // Set gray color for unselected items
        selectedLabelStyle: TextStyle(fontSize: 10), // Smaller font for selected label
        unselectedLabelStyle: TextStyle(fontSize: 10), // Smaller font for unselected label
        items: const <BottomNavigationBarItem>[
          BottomNavigationBarItem(
            icon: Icon(Icons.home),
            label: 'Home',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.list),
            label: 'Orders',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.card_travel),
            label: 'Journey',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.account_circle),
            label: 'Profile',
          ),
        ],
      ),
    );
  }
}
