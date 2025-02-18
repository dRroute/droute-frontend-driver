import 'package:flutter/material.dart';
import 'package:droute_driver_frontend/styles/custom_widgets/complete_detail_progress_bar.dart';

class CompleteDetailForm extends StatelessWidget {
  const CompleteDetailForm({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: Colors.white,
        elevation: 4, // Creates a shadow effect
        shadowColor: Colors.black38,
        centerTitle: true,
        leading: IconButton(
          onPressed: () {
            Navigator.pop(context);
          },
          icon: Icon(Icons.arrow_back, color: Colors.black),
        ),
        title: Text(
          'Complete Detail',
          style: TextStyle(
            color: Colors.black,
            fontSize: 20,
            fontWeight: FontWeight.w500,
          ),
        ),
      ),
      body: Column(
        children: [
          Row(
            children: [
              CompleteDetailProgressBar(completedSteps: 3),

            ],
          )
        ],
      ), // Blank body
    );
  }
}