import 'package:droute_driver_frontend/screens/driver/home.dart';
import 'package:droute_driver_frontend/screens/orders/requestedOrderDetail.dart';
import 'package:droute_driver_frontend/styles/color/app_color.dart';
import 'package:flutter/material.dart';
import "package:droute_driver_frontend/styles/custom_widgets/custom_scaffold.dart";
// import 'requested_order_detail.dart'; // Import your detail page
import 'package:flutter/services.dart'; 

class RequestedOrders extends StatelessWidget {
  final List<Map<String, String>> users = List.generate(
    10,
        (index) => {
      "name": "User ${index + 1}",
      "description": "This is a description for User ${index + 1}.",
      "imageUrl": "https://media.telanganatoday.com/wp-content/uploads/2025/02/Virat-Kohli-1.jpg",
    },
  );

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
    
    return CustomScaffold(

         appBar: AppBar(
        backgroundColor: Colors.white,
        elevation: 0,
        systemOverlayStyle: const SystemUiOverlayStyle(
          statusBarColor: AppColor.primaryColor,
          statusBarIconBrightness: Brightness.light,
        ),
        title: const Text(
          'Requested Orders',
          style: TextStyle(
            color: Colors.black,
            fontSize: 16,
          ),
        ),
        centerTitle: true,
        leading: IconButton(
          icon: const Icon(Icons.arrow_back, color: Colors.black),
          onPressed: () => Navigator.pop(context),
        ),
        bottom: PreferredSize(
          preferredSize: const Size.fromHeight(1.0),
          child: Container(
            color: Colors.grey.shade300,
            height: 1.0,
          ),
        ),
      ),
      body: ListView.builder(
        padding: const EdgeInsets.all(10),
        itemCount: users.length,
        itemBuilder: (context, index) {
          final user = users[index];
          return GestureDetector(
            onTap: () {
              Navigator.push(
                context,
                MaterialPageRoute(
                  builder: (context) => RequestedOrderDetail(
                    name: user['name']!,
                    description: user['description']!,
                    imageUrl: user['imageUrl']!,
                  ),
                ),
              );
            },
            child: Container(
              margin: const EdgeInsets.only(bottom: 1),
              padding: const EdgeInsets.all(10),
              decoration: BoxDecoration(
                color: Colors.white,
                borderRadius: BorderRadius.circular(8),
                boxShadow: [
                  BoxShadow(
                    color: Colors.grey.withOpacity(0.2),
                    spreadRadius: 1,
                    blurRadius: 5,
                    offset: const Offset(0, 3),
                  ),
                ],
              ),
              child: Row(
                crossAxisAlignment: CrossAxisAlignment.center,
                children: [
                  CircleAvatar(
                    radius: 24,
                    backgroundImage: NetworkImage(user['imageUrl']!),
                  ),
                  const SizedBox(width: 12),
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          user['name']!,
                          style: const TextStyle(fontSize: 16, fontWeight: FontWeight.w500),
                        ),
                        Text(
                          user['description']!,
                          style: const TextStyle(fontSize: 12, fontWeight: FontWeight.w400, color: Colors.grey),
                        ),
                      ],
                    ),
                  ),
                ],
              ),
            ),
          );
        },
      ),
    );
  }
}

