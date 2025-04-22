import 'package:flutter/material.dart';
import 'package:droute_driver_frontend/styles/custom_widgets/navigation_bar.dart'; // Import Custom Navigation Bar

class CustomScaffold extends StatelessWidget {
  final Widget body;
  final PreferredSizeWidget? appBar;

  const CustomScaffold({
    super.key, // Added key parameter
    required this.body,
    this.appBar,
  });

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      appBar: appBar,
      body: body,
      // bottomNavigationBar: CustomNavigationBar(), // Attach the custom bottom navigation here
    );
  }
}
