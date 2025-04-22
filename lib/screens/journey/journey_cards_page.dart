import 'package:droute_driver_frontend/screens/driver/home.dart';
import 'package:flutter/material.dart';
import 'package:droute_driver_frontend/styles/color/app_color.dart';
import 'package:droute_driver_frontend/styles/custom_widgets/custom_scaffold.dart';
import 'package:droute_driver_frontend/screens/journey/JourneyCard.dart';
import 'package:droute_driver_frontend/styles/custom_widgets/navigation_bar.dart';  // Updated import
import 'package:flutter/services.dart'; 

class JourneyData {
  final String fromLocation;
  final String toLocation;
  final String departureDateTime;
  final String arrivalDateTime;
  final String availableSpace;
  final String journeyStatus;

  JourneyData(this.fromLocation, this.toLocation, this.departureDateTime, this.arrivalDateTime, this.availableSpace,this.journeyStatus);
}

class JourneyCardsPage extends StatelessWidget {
  const JourneyCardsPage({super.key});

  @override
  Widget build(BuildContext context) {

  SystemChrome.setSystemUIOverlayStyle(
      const SystemUiOverlayStyle(
        statusBarColor: AppColor.primaryColor,
        statusBarIconBrightness: Brightness.light,
        systemNavigationBarColor: Colors.white,
        systemNavigationBarIconBrightness: Brightness.dark,
      ),
    );

    final List<JourneyData> yourList = [
      JourneyData("New York", "Los Angeles", "2025-02-20 10:00 AM", "2025-02-21 06:00 PM", "5 Seats","Ongoing"),
      JourneyData("Chicago", "Houston", "2025-02-22 09:00 AM", "2025-02-22 07:00 PM", "3 Seats","Completed"),
      JourneyData("San Francisco", "Seattle", "2025-02-23 08:00 AM", "2025-02-23 02:00 PM", "2 Seats","Ongoing"),
      JourneyData("New York", "Los Angeles", "2025-02-20 10:00 AM", "2025-02-21 06:00 PM", "5 Seats","Cancelled"),
      JourneyData("Chicago", "Houston", "2025-02-22 09:00 AM", "2025-02-22 07:00 PM", "3 Seats","Completed"),
      JourneyData("San Francisco", "Seattle", "2025-02-23 08:00 AM", "2025-02-23 02:00 PM", "2 Seats","Ongoinng"),
    ];

    return 
     CustomScaffold(
       appBar: AppBar(
        backgroundColor: Colors.white,
        elevation: 4,
        shadowColor: Colors.black38,
        systemOverlayStyle: SystemUiOverlayStyle(
          statusBarColor: AppColor.primaryColor, // Match this with the system chrome
          statusBarIconBrightness: Brightness.light,
        ),
        centerTitle: true,
     
        title: Text(
          'Your Journey',
          style: TextStyle(
            color: Colors.black,
            fontSize: 16,
            fontWeight: FontWeight.w500,
          ),
        ),
      ),
      body: Expanded(
        child: Container(
          color: Colors.white,
          child: ListView.builder(
            itemCount: yourList.length,
            itemBuilder: (context, index) {
              final data = yourList[index];
              return Padding(
                padding: const EdgeInsets.symmetric(vertical: 5.0, horizontal: 10.0),
                child: JourneyCard(
                  fromLocation: data.fromLocation,
                  toLocation: data.toLocation,
                  departureDateTime: data.departureDateTime,
                  arrivalDateTime: data.arrivalDateTime,
                  availableSpace: data.availableSpace,
                  journeyStatus:data.journeyStatus,
                ),
              );
            },
          ),
        ),
      ),

    );

  }
}
