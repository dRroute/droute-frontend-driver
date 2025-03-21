import 'package:flutter/material.dart';
import 'package:droute_driver_frontend/styles/custom_widgets/navigation_bar.dart';  // Updated import

class CustomScaffold extends StatelessWidget {
  final Widget body;
  final PreferredSizeWidget? appBar;  // Allow AppBar to be optional

  CustomScaffold({required this.body, this.appBar});  // Correct constructor

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: appBar,  // Assign the optional AppBar
      body: body,
      bottomNavigationBar: CustomNavigationBar(),  // Use renamed widget here
    );
  }
}
