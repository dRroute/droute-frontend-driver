import 'package:droute_driver_frontend/screens/orders/requestedOrderDetail.dart';
import 'package:flutter/material.dart';
import "package:droute_driver_frontend/styles/custom_widgets/custom_scaffold.dart";
// import 'requested_order_detail.dart'; // Import your detail page

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
    return CustomScaffold(
      appBar: AppBar(
        backgroundColor: Colors.white,
        elevation: 2,
        centerTitle: true,
        title: const Text(
          'Requested Orders',
          style: TextStyle(color: Colors.black, fontSize: 20, fontWeight: FontWeight.w500),
        ),
        leading: IconButton(
          icon: const Icon(Icons.arrow_back, color: Colors.black),
          onPressed: () => Navigator.pop(context),
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
              margin: const EdgeInsets.only(bottom: 10),
              padding: const EdgeInsets.all(16),
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
                          style: const TextStyle(fontSize: 18, fontWeight: FontWeight.w500),
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

