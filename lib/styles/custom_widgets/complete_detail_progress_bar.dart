import 'package:flutter/material.dart';

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
    return Column(
      mainAxisSize: MainAxisSize.min,
      children: [
        Container(
          padding: const EdgeInsets.only(top: 16, right: 16, left: 16, bottom: 0),
          child: Row(
            mainAxisAlignment: MainAxisAlignment.center, // Center the row horizontally
            children:
            List.generate(totalSteps, (index) {
              bool isCompleted = index < completedSteps;
              return Row(
                children: [
                  CircleAvatar(
                    radius: 14,
                    backgroundColor: isCompleted ? Colors.teal : Colors.grey,
                    child: Text(
                      (index + 1).toString(),
                      style: const TextStyle(color: Colors.white),
                    ),
                  ),
                  if (index < totalSteps - 1)

                    Container(
                      width: 50, // Fixed width to prevent overflow
                      height: 4,
                      color: index < completedSteps - 1
                          ? Colors.teal
                          : Colors.grey,
                    ),
                ],
              );
            }),
          ),
        ),
      ],
    );
  }
}
