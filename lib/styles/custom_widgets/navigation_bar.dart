import 'package:droute_driver_frontend/screens/orders/requestedOrders.dart';
import 'package:droute_driver_frontend/styles/custom_widgets/custom_scaffold.dart';
import 'package:flutter/material.dart';
import 'package:droute_driver_frontend/screens/driver/home.dart';
import 'package:droute_driver_frontend/screens/journey/journey_cards_page.dart';
import 'package:droute_driver_frontend/screens/driver/profile.dart';

class CustomNavigationBar extends StatefulWidget {
  @override
  _CustomNavigationBarState createState() => _CustomNavigationBarState();
}

class _CustomNavigationBarState extends State<CustomNavigationBar> {
  int _selectedIndex = 0; // Track selected tab index

  final List<Widget> _screens = [
    Home(),
    RequestedOrders(),
    JourneyCardsPage(),
    ProfileScreen(),
  ];


  void _onItemTapped(int index) {
    setState(() {
      _selectedIndex = index;
    });
    Navigator.pushReplacement(
      context,
      MaterialPageRoute(builder: (context) => _screens[index]),
    );
  }

  @override
  Widget build(BuildContext context) {
    return BottomNavigationBar(
      currentIndex: _selectedIndex,
      backgroundColor: Colors.white,
      elevation: 10,
      selectedItemColor: Colors.black45,
      unselectedItemColor: Colors.grey,
      onTap: _onItemTapped, // Handle navigation
      items: [
        BottomNavigationBarItem(icon: Icon(Icons.home), label: 'Home'),
        BottomNavigationBarItem(
            icon: Icon(Icons.notifications_active_outlined), label: 'Requests'),
        BottomNavigationBarItem(icon: Icon(Icons.car_crash), label: 'Journey'),
        BottomNavigationBarItem(icon: Icon(Icons.account_circle), label: 'Profile'),
      ],
    );
  }
}
