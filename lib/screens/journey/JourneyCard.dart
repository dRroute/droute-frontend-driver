import 'package:flutter/material.dart';

class JourneyCard extends StatelessWidget {
  final String fromLocation;
  final String toLocation;
  final String departureDateTime;
  final String arrivalDateTime;
  final String availableSpace;
  final String journeyStatus;

  const JourneyCard({
    super.key,
    required this.fromLocation,
    required this.toLocation,
    required this.departureDateTime,
    required this.arrivalDateTime,
    required this.availableSpace,
    required this.journeyStatus,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      width: double.infinity,
      padding: EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(20),
        boxShadow: [
          BoxShadow(
            color: Colors.grey.withOpacity(0.2),
            spreadRadius: 1,
            blurRadius: 5,
            offset: Offset(0, 3),
          ),
        ],
      ),
      child: Column(
        children: [
          Row(
            children: [
              Icon(Icons.location_on_outlined, color: Colors.red, size: 25),
              SizedBox(width: 2),
              Expanded(
                child: Text.rich(
                  TextSpan(
                    children: [
                      TextSpan(
                        text: 'From : ',
                        style: TextStyle(
                          fontSize: 12,
                          fontWeight: FontWeight.bold,
                          color: Colors.black,
                        ),
                      ),
                      TextSpan(
                        text: fromLocation,
                        style: TextStyle(
                          fontSize: 12,
                          fontWeight: FontWeight.w400,
                          color: Colors.black,
                        ),
                      ),
                    ],
                  ),
                  textAlign: TextAlign.start,
                ),
              ),
              SizedBox(width: 6),
              Expanded(
                child: Text.rich(
                  TextSpan(
                    children: [
                      TextSpan(
                        text: 'To : ',
                        style: TextStyle(
                          fontSize: 12,
                          fontWeight: FontWeight.bold,
                          color: Colors.black,
                        ),
                      ),
                      TextSpan(
                        text: toLocation,
                        style: TextStyle(
                          fontSize: 12,
                          fontWeight: FontWeight.w400,
                          color: Colors.black,
                        ),
                      ),
                    ],
                  ),
                  textAlign: TextAlign.start,
                ),
              ),
            ],
          ),
          SizedBox(height: 6),
          Divider(color: Colors.grey),
          SizedBox(height: 6),
          Row(
            children: [
              Icon(Icons.access_time, color: Colors.black, size: 20),
              SizedBox(width: 5),
              Text.rich(
                TextSpan(
                  children: [
                    TextSpan(
                      text: 'Departure : ',
                      style: TextStyle(
                        fontSize: 12,
                        fontWeight: FontWeight.bold,
                        color: Colors.black,
                      ),
                    ),
                    TextSpan(
                      text: departureDateTime,
                      style: TextStyle(
                        fontSize: 12,
                        fontWeight: FontWeight.w400,
                        color: Colors.black,
                      ),
                    ),
                  ],
                ),
                textAlign: TextAlign.start,
              ),
            ],
          ),
          SizedBox(height: 6),
          Row(
            children: [
              Icon(Icons.access_time, color: Colors.black, size: 20),
              SizedBox(width: 5),
              Text.rich(
                TextSpan(
                  children: [
                    TextSpan(
                      text: 'Arrival : ',
                      style: TextStyle(
                        fontSize: 12,
                        fontWeight: FontWeight.bold,
                        color: Colors.black,
                      ),
                    ),
                    TextSpan(
                      text: arrivalDateTime,
                      style: TextStyle(
                        fontSize: 12,
                        fontWeight: FontWeight.w400,
                        color: Colors.black,
                      ),
                    ),
                  ],
                ),
                textAlign: TextAlign.start,
              ),
            ],
          ),
          SizedBox(height: 6),
          Divider(color: Colors.grey),
          SizedBox(height: 6),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text.rich(
                TextSpan(
                  children: [
                    TextSpan(
                      text: '  Status : ',
                      style: TextStyle(
                        fontSize: 12,
                        fontWeight: FontWeight.bold,
                        color: Colors.black,
                      ),
                    ),
      TextSpan(
        text: journeyStatus,
        style: TextStyle(
          fontSize: 12,
          fontWeight: FontWeight.w400,
          color: journeyStatus == "Ongoing"
              ? Colors.blue
              : journeyStatus == "Completed"
              ? Colors.green
              : Colors.red, // Default to red for "Cancelled"
        ),
      ),

                  ],
                ),
                textAlign: TextAlign.start,
              ),
              Text(
                'View Details',
                style: TextStyle(
                  color: Colors.orange,
                  fontWeight: FontWeight.bold,
                ),
              )
            ],
          ),
        ],
      ),
    );
  }
}
