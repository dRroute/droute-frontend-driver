// import 'package:droute_driver_frontend/screens/driver/home.dart';
// import 'package:flutter/material.dart';
// import 'package:droute_driver_frontend/styles/custom_widgets/complete_detail_progress_bar.dart';
//
// class CompleteDetailForm extends StatelessWidget {
//   const CompleteDetailForm({super.key});
//
//   @override
//   Widget build(BuildContext context) {
//     return Scaffold(
//       appBar: AppBar(
//         backgroundColor: Colors.white,
//         elevation: 4,
//         shadowColor: Colors.black38,
//         centerTitle: true,
//         leading: IconButton(
//           onPressed: () {
//             Navigator.pop(context);
//           },
//           icon: Icon(Icons.arrow_back, color: Colors.black),
//         ),
//         title: Text(
//           'Complete Detail',
//           style: TextStyle(
//             color: Colors.black,
//             fontSize: 20,
//             fontWeight: FontWeight.w500,
//           ),
//         ),
//       ),
//       body: Column(
//         crossAxisAlignment: CrossAxisAlignment.center,
//         children: [
//           // Progress Bar right below AppBar
//           Container(
//             width: double.infinity,
//             padding: EdgeInsets.symmetric(vertical: 10),
//
//             child: CompleteDetailProgressBar(completedSteps: 5),
//           ),
//
//           // Main Content - Page Under Development
//           Expanded(
//             child: Column(
//               mainAxisAlignment: MainAxisAlignment.center,
//               crossAxisAlignment: CrossAxisAlignment.center,
//               children: [
//                 Icon(
//                   Icons.build_circle_outlined,
//                   size: 100,
//                   color: Colors.teal,
//                 ),
//                 SizedBox(height: 20),
//                 Text(
//                   "This Page is Under Development",
//                   style: TextStyle(fontSize: 18, fontWeight: FontWeight.w600),
//                 ),
//                 SizedBox(height: 30),
//                 Padding(
//                   padding: const EdgeInsets.symmetric(horizontal: 40),
//                   child: ElevatedButton(
//                     style: ElevatedButton.styleFrom(
//                       backgroundColor: Colors.teal,
//                       padding: EdgeInsets.symmetric(vertical: 15),
//                       shape: RoundedRectangleBorder(
//                         borderRadius: BorderRadius.circular(8),
//                       ),
//                     ),
//                     onPressed: () {
//                       Navigator.pushReplacement(context, MaterialPageRoute(builder: (context) => Home()));
//                     },
//                     child: Center(
//                       child: Text(
//                         "Continue to Home",
//                         style: TextStyle(
//                           fontSize: 16,
//                           fontWeight: FontWeight.bold,
//                           color: Colors.white,
//                         ),
//                       ),
//                     ),
//                   ),
//                 ),
//               ],
//             ),
//           ),
//         ],
//       ),
//     );
//   }
// }
