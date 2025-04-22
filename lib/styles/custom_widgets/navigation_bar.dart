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
        type: BottomNavigationBarType.fixed,  // Ensure background color applies
        backgroundColor: Colors.white,        // Set navigation bar background color
        currentIndex: _selectedIndex,
        onTap: _onItemTapped,
        selectedItemColor: AppColor.primaryColor,   // Active icon and label color
        unselectedItemColor: Colors.grey,           // Inactive icon and label color
        selectedLabelStyle: TextStyle(fontSize: 10),
        unselectedLabelStyle: TextStyle(fontSize: 10),
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
