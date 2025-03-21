import 'package:flutter/material.dart';
import 'package:droute_driver_frontend/styles/color/app_color.dart';
import 'package:http/http.dart' as http;

class Chat extends StatefulWidget {
  @override
  State<Chat> createState() => _ChatState();
}

class _ChatState extends State<Chat> {

  String? _validImageUrl;
 String   imageUrl="https://media.telanganatoday.com/wp-content/uploads/2025/02/Virat-Kohli-1.jpg";
  String name="driver name";
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
          _validImageUrl = imageUrl; // Use the image if valid
        });
      } else {
        setState(() {
          _validImageUrl = null; // Fallback to letter avatar
        });
      }
    } catch (e) {
      setState(() {
        print("null");
        _validImageUrl = null; // Error case, fallback to letter avatar
      });
    }
  }



  final TextEditingController _messageController = TextEditingController();
  final List<Map<String, String>> messages = [
    {"sender": "alok@gmail.com", "message": "How Can I help You?"},
    {"sender": "alok@gmail.com", "message": "Virat Kohli this Side"},
    {"sender": "alok@gmail.com", "message": "Welcome to DRoute!"},
    {"sender": "alok@gmail.com", "message": "hi"},
  ];

  void _sendMessage() {
    if (_messageController.text.trim().isNotEmpty) {
      setState(() {
        messages.insert(0, {"sender": "You", "message": _messageController.text.trim()});
      });
      _messageController.clear();
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColor.primaryColor,
      body: Column(
        children: [
          Container(
            width: double.infinity,
            padding: const EdgeInsets.symmetric(vertical: 20, horizontal: 16),
            decoration: BoxDecoration(
              color: Colors.white,
              boxShadow: [
                BoxShadow(color: Colors.black12, blurRadius: 5, spreadRadius: 2, offset: Offset(0, 3)),
              ],
            ),
            child: SafeArea(
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween, // Ensures proper spacing
                children: [
                  Row(
                    children: [
                      CircleAvatar(
                        radius: 24,
                        backgroundColor: _validImageUrl == null ? Colors.blue : null,
                        backgroundImage: _validImageUrl != null ? NetworkImage(_validImageUrl!) : null,
                        child: _validImageUrl == null
                            ? Text(
                          name.isNotEmpty ? name[0].toUpperCase() : "?",
                          style: const TextStyle(fontSize: 20, fontWeight: FontWeight.bold, color: Colors.white),
                        )
                            : null,
                      ),

                      const SizedBox(width: 12),

                      // Name & Journey ID Column
                      Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: const [
                          Text(
                            "Driver Name",
                            style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
                          ),
                          Text(
                            "Journey ID: droute45626",
                            style: TextStyle(fontSize: 14, color: Colors.grey),
                          ),
                        ],
                      ),
                    ],
                  ),

                  // Offer Button Column
                  Container(
                    padding: const EdgeInsets.symmetric(vertical: 6, horizontal: 12),
                    decoration: BoxDecoration(
                      color: AppColor.primaryColor, // Use your primary color
                      borderRadius: BorderRadius.circular(4), // Rounded corners
                      boxShadow: [
                        BoxShadow(
                          color: Colors.black26,
                          blurRadius: 4,
                          spreadRadius: 1,
                          offset: const Offset(0, 2),
                        ),
                      ],
                    ),
                    child: const Text(
                      "View Request",
                      style: TextStyle(fontSize: 14, color: Colors.white, fontWeight: FontWeight.bold),
                    ),
                  ),
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
                    alignment: isYou ? Alignment.centerRight : Alignment.centerLeft,
                    child: Container(
                      margin: const EdgeInsets.symmetric(vertical: 5, horizontal: 8),
                      padding: const EdgeInsets.all(10),
                      constraints: const BoxConstraints(minWidth: 80, maxWidth: 250), // Ensures proper width
                      decoration: BoxDecoration(
                        color: isYou ? Colors.yellow.shade100 : Colors.grey.shade300,
                        borderRadius: BorderRadius.only(
                          topLeft: !isYou ? Radius.zero : const Radius.circular(10),
                          topRight: const Radius.circular(10),
                          bottomLeft: const Radius.circular(10),
                          bottomRight: isYou ? Radius.zero : const Radius.circular(10),
                        ),
                      ),
                      child: Column(
                        crossAxisAlignment: isYou?CrossAxisAlignment.end:CrossAxisAlignment.start, // Ensures timestamp aligns right
                        children: [
                          Text(
                            messageData['message']!,
                            style: const TextStyle(fontSize: 16),
                          ),
                          const SizedBox(height: 5), // Space between message and timestamp
                          Text(
                            "6 min ago", // Hardcoded timestamp
                            style: TextStyle(fontSize: 10, color: Colors.grey.shade600),
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
                BoxShadow(color: Colors.black12, blurRadius: 5, spreadRadius: 2, offset: Offset(0, -2)),
              ],
            ),
            child: Row(
              children: [
                Expanded(
                  child: TextField(
                    controller: _messageController,
                    decoration: InputDecoration(
                      hintText: "Type a message...",
                      border: OutlineInputBorder(
                        borderRadius: BorderRadius.circular(20),
                        borderSide: BorderSide.none,
                      ),
                      filled: true,
                      fillColor: Colors.grey.shade200,
                      contentPadding: const EdgeInsets.symmetric(vertical: 10, horizontal: 15),
                    ),
                  ),
                ),
                const SizedBox(width: 10),
                IconButton(
                  icon: const Icon(Icons.add_photo_alternate_outlined, color: AppColor.primaryColor),
                  onPressed: () {},
                ),

                IconButton(
                  icon: const Icon(Icons.add_a_photo, color: AppColor.primaryColor),
                  onPressed: () {},
                ),
                IconButton(
                  icon: const Icon(Icons.send,  color: AppColor.primaryColor),
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
