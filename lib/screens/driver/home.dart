import 'package:droute_driver_frontend/screens/driver/Chat.dart';
import 'package:droute_driver_frontend/screens/journey/journey_cards_page.dart';
import 'package:droute_driver_frontend/screens/journey/postJourney.dart';
import 'package:droute_driver_frontend/screens/map/search_on_map.dart';
import 'package:flutter/material.dart';
import 'package:droute_driver_frontend/styles/color/app_color.dart';
import 'package:droute_driver_frontend/styles/custom_widgets/custom_scaffold.dart';
import 'package:droute_driver_frontend/styles/custom_widgets/custom_card_home.dart';

class Home extends StatelessWidget {
  const Home({super.key});

  @override
  Widget build(BuildContext context) {
    return CustomScaffold(
        body:Container(
        decoration: BoxDecoration(
          image: DecorationImage(
            image: NetworkImage(
              "https://images.unsplash.com/photo-1543253539-58c7d1c00c8a?q=80&w=1934&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            ),
            fit: BoxFit.cover,
          ),
        ),
        child:
      Column(
        children: [
          Container(
            padding: EdgeInsets.only(top: 60, left: 30, right: 30, bottom: 30),
            child: Column(children: <Widget>[
              Row(
                mainAxisAlignment: MainAxisAlignment.end,
                children: [

                  Text.rich(
                    TextSpan(
                      children: [
                        TextSpan(
                          text: 'Current Location\n',
                          style: TextStyle(
                            fontSize: 10,
                            fontWeight: FontWeight.bold,
                            color: Colors.white,
                          ),
                        ),
                        TextSpan(
                          text: 'Sinhgad Vadgaon ,Pune',
                          style: TextStyle(
                            fontSize: 15,
                            fontWeight: FontWeight.w400,
                            color: Colors.white,
                          ),
                        ),
                      ],
                    ),
                    textAlign: TextAlign.center,
                  ),
                  Icon(
                      Icons.location_on_outlined,
                    size: 30,
                    color: Colors.white,
                  ),

                ],
              ),
            const SizedBox(height: 10,),
              Row(
                mainAxisAlignment: MainAxisAlignment.start,
                children: [
                  Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text("WELCOME",
                        style: TextStyle(
                          color: Colors.white,
                          fontSize: 25.0,

                        ),),
                      SizedBox(width:120,height: 1,
                        child: DecoratedBox(
                          decoration: BoxDecoration(
                            color : Colors.white,
                          ),
                        ),
                      ),
                      SizedBox(height: 10,),
                      Text("Alok Singh",
                      style: TextStyle(
                        color: Colors.white,
                          fontSize: 20.0
                      ),),
                      SizedBox(height: 10,),
                      Text("Driver Id :DROUTE012578",
                        style: TextStyle(
                            color: Colors.white,
                            fontSize: 10.0
                        ),),
                      SizedBox(height: 5,),
                      Text("Vehicle No. : MH14FE4940",
                        style: TextStyle(
                            color: Colors.white,
                            fontSize: 10.0
                        ),)
                    ],
                  )


                ],
              )

            ]
            ),
          ),
          Expanded(

            child:Container(
              decoration: BoxDecoration(
                color: Colors.white,
                borderRadius: BorderRadius.only(
                  topRight: Radius.circular(30.0),
                  topLeft: Radius.circular(30.0),
                ),
                boxShadow: [
                  BoxShadow(
                    color: Colors.black.withOpacity(0.2),
                    spreadRadius: 2,
                    blurRadius: 10,
                    offset: Offset(0, -3),
                  ),
                ],
              ),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                children: [
                  Expanded(
                    child: Column(
                      mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                      children: [
                        CustomCardHome(
                          icon: Icons.add,

                          iconColor: Color(0xFF52C01B),
                          iconBackgroundColor: Color(0xFFEBFCE4),
                          title: 'Post a New Journey',
                          description: 'Start sharing your experiences \nExplore new opportunities',
                          onTap: () {
                            Navigator.push(
                              context,
                              MaterialPageRoute(builder: (context) => PostJourney()), // Navigate to SupportScreen
                            );
                          },
                        ),
                        CustomCardHome(
                          icon: Icons.shopping_cart_checkout_rounded,
                          iconColor: Color(0xFFF4721E),
                          iconBackgroundColor: Color(0xFFFCEDE4),
                          title: 'Pending Orders',
                          description: 'Explore new job opportunities \nFind your next career',
                          onTap: () {
                            Navigator.push(
                              context,
                              MaterialPageRoute(builder: (context) => Home()), // Navigate to SupportScreen
                            );
                          },
                        ),
                        CustomCardHome(
                          icon: Icons.chat,
                          iconColor: Color(0xFF039E82),
                          iconBackgroundColor: Color(0xFFD4FCF5),
                          title: 'Chats',
                          description: 'Explore new job opportunities \nFind your next career',
                          onTap: () {
                            Navigator.push(
                              context,
                              MaterialPageRoute(builder: (context) => Chat()), // Navigate to SupportScreen
                            );
                          },
                        ),
                      ],
                    ),
                  ),
                  Expanded(
                    child: Column(
                      mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                      children: [
                        CustomCardHome(
                          icon: Icons.swap_vertical_circle_outlined,
                          iconColor: Color(0xFF4F0B4D),
                          iconBackgroundColor: Color(0xFFFBE6FB),
                          title: 'All Trips',
                          description: 'Explore new job opportunities \nFind your next career',
                          onTap: () {
                            Navigator.push(
                              context,
                              MaterialPageRoute(builder: (context) => JourneyCardsPage()), // Navigate to SupportScreen
                            );
                          },
                        ),
                        CustomCardHome(
                          icon: Icons.attach_money,
                          iconColor: Color(0xFFD27C2C),
                          iconBackgroundColor: Color(0xFFFCEDE4),
                          title: 'Payments',
                          description: 'Explore new job opportunities \nFind your next career',
                          onTap: () {
                            Navigator.push(
                              context,
                              MaterialPageRoute(builder: (context) => Home()), // Navigate to SupportScreen
                            );
                          },
                        ),
                        CustomCardHome(
                          icon: Icons.support_agent_rounded,
                          iconColor: Color(0xFFC01B56),
                          iconBackgroundColor: Color(0xFFF7E9EF),
                          title: 'Support',
                          description: 'Explore new job opportunities \nFind your next career',
                          onTap: () {
                            Navigator.push(
                              context,
                              MaterialPageRoute(builder: (context) => Home()), // Navigate to SupportScreen
                            );
                          },
                        ),
                      ],
                    ),
                  ),
                ],
              ),
            )

          ),

        ],
      ),
      
      )
    );
  }
}
