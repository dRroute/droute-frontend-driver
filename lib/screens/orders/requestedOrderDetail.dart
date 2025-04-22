import 'package:droute_driver_frontend/screens/driver/Chat.dart';
import 'package:droute_driver_frontend/styles/color/app_color.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

class RequestedOrderDetail extends StatefulWidget {
  final String name;
  final String description;
  final String imageUrl;

  const RequestedOrderDetail({
    super.key,
    required this.name,
    required this.description,
    required this.imageUrl,
  });

  @override
  _RequestedOrderDetailState createState() => _RequestedOrderDetailState();
}

class _RequestedOrderDetailState extends State<RequestedOrderDetail> {
  String? selectedLocation = "Pune"; // Move outside build()

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

    return Scaffold(
      appBar: AppBar(
        backgroundColor: Colors.white,
        elevation: 4,
        shadowColor: Colors.black38,
        systemOverlayStyle: SystemUiOverlayStyle(
          statusBarColor:
              AppColor.primaryColor, // Match this with the system chrome
          statusBarIconBrightness: Brightness.light,
        ),
        centerTitle: true,
        leading: IconButton(
          onPressed: () {
            Navigator.pop(context);
          },
          icon: Icon(Icons.arrow_back, color: Colors.black),
        ),
        title: Text(
          'Take an action',
          style: TextStyle(
            color: Colors.black,
            fontSize: 16,
            fontWeight: FontWeight.w500,
          ),
        ),
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Driver Information
            Row(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                CircleAvatar(
                  radius: 24,
                  backgroundColor: Colors.grey[400], // Fallback color
                  backgroundImage: widget.imageUrl.isNotEmpty
                      ? NetworkImage(widget.imageUrl)
                      : null,
                  child: widget.imageUrl.isEmpty
                      ? Icon(Icons.person, color: Colors.grey[700])
                      : null, // Fallback icon if no image
                ),
                const SizedBox(width: 10),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          Text(
                            widget.name,
                            style: const TextStyle(
                                fontSize: 16, fontWeight: FontWeight.bold),
                          ),
                          Row(
                            children: const [
                              Icon(Icons.star, color: Colors.amber, size: 20),
                              SizedBox(width: 5),
                              Text("4.5"),
                            ],
                          ),
                        ],
                      ),
                      const SizedBox(height: 5),
                      Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: const [
                          Text("+91 97567876567",
                              style: TextStyle(fontSize: 14)),
                          Text(
                            "See Reviews",
                            style: TextStyle(
                              color: Color.fromARGB(255, 0, 68, 124),
                              fontWeight: FontWeight.bold,
                              fontSize: 12,
                            ),
                          ),
                        ],
                      ),
                    ],
                  ),
                ),
              ],
            ),
            const SizedBox(height: 20),

            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Text(
                  "Chat With user :",
                  style: TextStyle(fontSize: 14, fontWeight: FontWeight.bold),
                ),
                GestureDetector(
                  onTap: () {
                    Navigator.push(
                      context,
                      MaterialPageRoute(
                          builder: (context) =>
                              Chat()), // Navigate to Chat screen
                    );
                  },
                  child: Icon(
                    Icons.chat,
                    size: 24,
                    color: AppColor.primaryColor,
                  ),
                ),
              ],
            ),
            const SizedBox(height: 25),


            // Location Selection
            Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Container(
                  padding: const EdgeInsets.all(12),
                  decoration: BoxDecoration(
                    color: Colors.white,
                    border: Border.all(color: Colors.grey[300]!),
                    borderRadius: BorderRadius.circular(8),
                  ),
                  child: Row(
                    children: [
                      const Icon(Icons.location_on, color: Colors.blue),
                      const SizedBox(width: 10),
                      Expanded(
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            const Text("Pune",
                                style: TextStyle(
                                    fontSize: 14, fontWeight: FontWeight.bold)),
                            const Text("Sky bay F wing, Mahalunge, Balewadi...",
                                style: TextStyle(color: Colors.grey,fontSize: 12)),
                          ],
                        ),
                      ),
                    ],
                  ),
                ),
                const SizedBox(height: 10),
                Container(
                  padding: const EdgeInsets.all(12),
                  decoration: BoxDecoration(
                    color: Colors.white,
                    border: Border.all(color: Colors.grey[300]!),
                    borderRadius: BorderRadius.circular(8),
                  ),
                  child: Row(
                    children: [
                      const Icon(Icons.location_on, color: Colors.blue),
                      const SizedBox(width: 10),
                      Expanded(
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            const Text("Navi Mumbai",
                                style: TextStyle(
                                    fontSize: 14, fontWeight: FontWeight.bold)),
                            const Text("Sky bay F wing, Mahalunge,Sky bay F wing, Mahalunge, Balewadi Balewadi Sky bay F wing, Mahalunge, Balewadi...",
                                style: TextStyle(color: Colors.grey ,fontSize: 12)),
                          ],
                        ),
                      ),
                    ],
                  ),
                ),
              ],
            ),

            const SizedBox(height: 20),

            // Package Details
            Container(
              padding: const EdgeInsets.all(16),
              decoration: BoxDecoration(
                border: Border.all(color: Colors.grey[300]!),
                borderRadius: BorderRadius.circular(8),
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  const Text(
                    "Package Details:",
                    style: TextStyle(fontSize: 14, fontWeight: FontWeight.bold),
                  ),
                  const SizedBox(height: 10),
                  buildPackageRow("Height:", "10 ft."),
                  buildPackageRow("Width:", "5 ft."),
                  buildPackageRow("Length:", "12 ft."),
                  buildPackageRow("Weight:", "25 Kg"),
                  buildPackageRow("Amount you'll Get:", "₹ 6000"),
                ],
              ),
            ),
            const SizedBox(height: 20),

            // Checkout Buttons
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceEvenly,
              children: [
                ElevatedButton(
                  onPressed: () {
                    // Navigate to the next screen (make sure it's defined)
                  },
                  style: ElevatedButton.styleFrom(
                    padding: const EdgeInsets.symmetric(
                        horizontal: 40, vertical: 10),
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(4),
                    ),
                    backgroundColor: Colors.teal,
                  ),
                  child: const Text(
                    "Accept",
                    style: TextStyle(
                      fontWeight: FontWeight.bold,
                      fontSize: 16,
                      color: Colors.white,
                    ),
                  ),
                ),
                const SizedBox(width: 10), // Gap between buttons
                ElevatedButton(
                  onPressed: () {
                    // Navigate to the next screen (make sure it's defined)
                  },
                  style: ElevatedButton.styleFrom(
                    padding: const EdgeInsets.symmetric(
                        horizontal: 40, vertical: 10),
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(4),
                    ),
                    backgroundColor: AppColor.ThirdColor,
                  ),
                  child: const Text(
                    "Reject",
                    style: TextStyle(
                      fontWeight: FontWeight.bold,
                      fontSize: 16,
                      color: Colors.white,
                    ),
                  ),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }

  Widget buildPackageRow(String label, String value) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 5),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Text(label, style: const TextStyle(fontWeight: FontWeight.bold,fontSize: 12)),
          Text(value,style: const TextStyle(fontSize: 12)),
        ],
      ),
    );
  }
}
