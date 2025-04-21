import 'package:flutter/material.dart';
import 'package:droute_driver_frontend/styles/color/app_color.dart';
import 'package:http/http.dart' as http;
import 'package:flutter/services.dart';

class Chat extends StatefulWidget {
  @override
  State<Chat> createState() => _ChatState();
}

class _ChatState extends State<Chat> {
  String? _validImageUrl;
  String imageUrl =
      "https://media.telanganatoday.com/wp-content/uploads/2025/02/Virat-Kohli-1.jpg";
  String name = "driver name";
  @override
  void initState() {
    super.initState();
    _checkImageValidity();
  }

  Future<void> _checkImageValidity() async {
    try {
      final response = await http.head(Uri.parse(imageUrl));

      if (response.statusCode == 200) {
        setState(() {
          _validImageUrl = imageUrl; // Valid image
        });
      } else {
        setState(() {
          _validImageUrl = null; // Invalid URL, fallback
        });
      }
    } catch (e) {
      print("Error: $e");
      setState(() {
        _validImageUrl = null; // On exception, fallback
      });
    }
  }

  final TextEditingController _messageController = TextEditingController();
  final List<Map<String, String>> messages = [
    {"sender": "alok@gmail.com", "message": "How Can I help You?"},
    {"sender": "alok@gmail.com", "message": "Driver this Side"},
    {"sender": "alok@gmail.com", "message": "Welcome to DRoute!"},
    {"sender": "alok@gmail.com", "message": "hi"},
  ];

  void _sendMessage() {
    if (_messageController.text.trim().isNotEmpty) {
      setState(() {
        messages.insert(
            0, {"sender": "You", "message": _messageController.text.trim()});
      });
      _messageController.clear();
    }
  }

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
      backgroundColor: AppColor.primaryColorLightest,
      body: Column(
        children: [
          Container(
            width: double.infinity,
            padding: const EdgeInsets.symmetric(vertical: 8, horizontal: 16),
            decoration: BoxDecoration(
              color: Colors.white,
              boxShadow: [
                BoxShadow(
                    color: const Color.fromARGB(31, 142, 142, 142),
                    blurRadius: 5,
                    spreadRadius: 2,
                    offset: Offset(0, 3)),
              ],
            ),
            child: SafeArea(
              child: Row(
                mainAxisAlignment:
                    MainAxisAlignment.spaceBetween, // Ensures proper spacing
                children: [
                  Row(
                    children: [
                      CircleAvatar(
                        radius: 24,
                        backgroundImage: NetworkImage(
                          'https://images.unsplash.com/photo-1602233158242-3ba0ac4d2167?w=600',
                        ),
                      ),

                      const SizedBox(width: 12),

                      // Name & Journey ID Column
                      Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: const [
                          Text(
                            "Driver Name",
                            style: TextStyle(
                                fontSize: 14,
                                fontWeight: FontWeight.bold,
                                color: AppColor.primaryColor),
                          ),
                          Text(
                            "Journey ID: droute45626",
                            style: TextStyle(fontSize: 12, color: Colors.grey),
                          ),
                        ],
                      ),
                    ],
                  ),

                  // Offer Button Column
                ],
              ),
            ),
          ),
          Expanded(
            child: Padding(
              padding: const EdgeInsets.all(6.0),
              child: ListView.builder(
                reverse: true,
                itemCount: messages.length,
                itemBuilder: (context, index) {
                  final messageData = messages[index];
                  bool isYou = messageData['sender'] == 'You';
                  return Align(
                    alignment:
                        isYou ? Alignment.centerRight : Alignment.centerLeft,
                    child: Container(
                      margin: const EdgeInsets.symmetric(
                          vertical: 5, horizontal: 8),
                      padding: const EdgeInsets.all(10),
                      constraints: const BoxConstraints(
                          minWidth: 80, maxWidth: 250), // Ensures proper width
                      decoration: BoxDecoration(
                        color: isYou
                            ? const Color.fromARGB(255, 255, 254, 225)
                            : const Color.fromARGB(255, 225, 255, 250),
                        borderRadius: BorderRadius.only(
                          topLeft:
                              !isYou ? Radius.zero : const Radius.circular(10),
                          topRight: const Radius.circular(10),
                          bottomLeft: const Radius.circular(10),
                          bottomRight:
                              isYou ? Radius.zero : const Radius.circular(10),
                        ),
                      ),
                      child: Column(
                        crossAxisAlignment: isYou
                            ? CrossAxisAlignment.end
                            : CrossAxisAlignment
                                .start, // Ensures timestamp aligns right
                        children: [
                          Text(
                            messageData['message']!,
                            style: const TextStyle(fontSize: 12),
                          ),
                          const SizedBox(
                              height: 5), // Space between message and timestamp
                          Text(
                            "6 min ago", // Hardcoded timestamp
                            style: TextStyle(
                                fontSize: 8, color: Colors.grey.shade600),
                          ),
                        ],
                      ),
                    ),
                  );
                },
              ),
            ),
          ),
          Container(
            width: double.infinity,
            padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 10),
            decoration: BoxDecoration(
              color: Colors.white,
              boxShadow: [
                BoxShadow(
                    color: Colors.black12,
                    blurRadius: 5,
                    spreadRadius: 2,
                    offset: Offset(0, -2)),
              ],
            ),
            child: Row(
              children: [
                Expanded(
                  child: TextField(
                    controller: _messageController,
                    decoration: InputDecoration(
                      hintText: "Type a message...",
                      hintStyle: TextStyle(
                          fontSize: 12), // Set the font size of the placeholder
                      border: OutlineInputBorder(
                        borderRadius: BorderRadius.circular(20),
                        borderSide: BorderSide.none,
                      ),
                      filled: true,
                      fillColor: Colors.grey.shade200,
                      contentPadding: const EdgeInsets.symmetric(
                          vertical: 10, horizontal: 15),
                    ),
                  ),
                ),
                const SizedBox(width: 10),
                IconButton(
                  icon: const Icon(Icons.add_photo_alternate_outlined,
                      color: AppColor.primaryColor),
                  onPressed: () {},
                ),
                IconButton(
                  icon: const Icon(Icons.add_a_photo,
                      color: AppColor.primaryColor),
                  onPressed: () {},
                ),
                IconButton(
                  icon: const Icon(Icons.send, color: AppColor.primaryColor),
                  onPressed: _sendMessage,
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
