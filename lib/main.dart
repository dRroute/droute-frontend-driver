import 'package:flutter/material.dart';
import 'package:droute_driver_frontend/utils/routes.dart'; // Import routes file
import 'package:droute_driver_frontend/screens/home.dart'; // Import HomePage
import 'package:droute_driver_frontend/screens/map/search_on_map.dart';
import 'package:droute_driver_frontend/screens/driver/Chat.dart';
import 'package:droute_driver_frontend/screens/map/Map_Page.dart';
void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'dRoute Driver App',
      debugShowCheckedModeBanner: false,
     // home: SplashScreen(),// Set SplashScreen as the initial screen
      home:MapPage(),
      routes: appRoutes, // Define app routes
    );
  }
}

// class SplashScreen extends StatefulWidget {
//   @override
//   _SplashScreenState createState() => _SplashScreenState();
// }
//
// class _SplashScreenState extends State<SplashScreen> {
//   @override
//   void initState() {
//     super.initState();
//     // Navigate to SignupPage after 1 second
//     Future.delayed(const Duration(seconds: 3), () {
//       Navigator.pushReplacementNamed(context, '/signup'); // Navigate to Signup
//     });
//   }
//
//   @override
//   Widget build(BuildContext context) {
//     return HomePage(); // Show the HomePage as the splash screen
//   }
// }
