import 'package:flutter/material.dart';
import 'package:droute_driver_frontend/styles/color/app_color.dart';
class CompleteDetailProgressBar extends StatelessWidget {
  final int completedSteps;
  final int totalSteps;

  const CompleteDetailProgressBar({
    super.key,
    required this.completedSteps,
    this.totalSteps = 5,
  });

  @override
  Widget build(BuildContext context) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.center,
      children: List.generate(totalSteps * 2 - 1, (index) {
        // Even indices are step circles, odd indices are connectors
        if (index % 2 == 0) {
          final stepNumber = (index ~/ 2) + 1;
          final isActive = stepNumber <= completedSteps;

          return Container(
            width: 30,
            height: 30,
            decoration: BoxDecoration(
              shape: BoxShape.circle,
              color: isActive ? AppColor.primaryColor : Colors.grey.shade300,
            ),
            child: Center(
              child: Text(
                stepNumber.toString(),
                style: TextStyle(
                  color: isActive ? Colors.white : Colors.grey.shade600,
                  fontWeight: FontWeight.bold,
                ),
              ),
            ),
          );
        } else {
          // Connector line
          return Expanded(
            child: Container(
              height: 2,
              color: Colors.grey.shade300,
            ),
          );
        }
      }),
    );
  }
}
