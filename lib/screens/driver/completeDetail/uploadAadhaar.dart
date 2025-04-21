
import 'dart:io';
import 'package:droute_driver_frontend/screens/driver/completeDetail/uploadLicence.dart';
import 'package:flutter/material.dart';
import 'package:image_picker/image_picker.dart';
import 'package:dotted_border/dotted_border.dart';
import 'package:droute_driver_frontend/styles/color/app_color.dart';
import 'package:droute_driver_frontend/styles/custom_widgets/complete_detail_progress_bar.dart';

class UploadAaadhar extends StatefulWidget {
  const UploadAaadhar
      ({super.key});

  @override
  _UploadAaadharState createState() => _UploadAaadharState();
}

class _UploadAaadharState extends State<UploadAaadhar> {
  File? _image; // Stores the selected image

  Future<void> _pickImage(ImageSource source) async {
    final ImagePicker picker = ImagePicker();
    final XFile? pickedFile = await picker.pickImage(source: source);

    if (pickedFile != null) {
      setState(() {
        _image = File(pickedFile.path); // Store the new image
      });
    }
  }
  @override
  Widget build(BuildContext context) {
    double fullWidth = MediaQuery.of(context).size.width;

    return Scaffold(
      appBar: AppBar(
        backgroundColor: Colors.white,
        elevation: 4,
        shadowColor: Colors.black38,
        centerTitle: true,
        leading: IconButton(
          onPressed: () => Navigator.pop(context),
          icon: Icon(Icons.arrow_back, color: Colors.black),
        ),
        title: Text(
          'Upload Aadhaar',
          style: TextStyle(
            color: Colors.black,
            fontSize: 16,
            fontWeight: FontWeight.w500,
          ),
        ),
      ),
      body: SingleChildScrollView(
        child: Column(
          children: [
            Row(
              children: [
                CompleteDetailProgressBar(completedSteps: 1),
              ],
            ),
            SizedBox(height: 20), // Added some spacing
            Center(
              child: DottedBorder(
                color: AppColor.primaryColor,
                strokeWidth: 2,
                dashPattern: [6, 3],
                borderType: BorderType.RRect,
                radius: Radius.circular(8),
                child: SizedBox( // Use SizedBox instead of Expanded
                  width: fullWidth * 0.8,
                  height: 200,
                  child: _image == null
                      ? Center(child: Text("Upload Aadhaar Card", style: TextStyle(color: Colors.black)))
                      : Image.file(_image!, fit: BoxFit.contain),
                ),
              ),
            ),
            SizedBox(height: 20),
            Column(
              mainAxisSize: MainAxisSize.min,
              children: [
                Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    _customOutlinedButton("Take Image", Icons.camera_alt, ImageSource.camera),
                    SizedBox(width: 10),
                    _customOutlinedButton("Upload from Gallery", Icons.photo, ImageSource.gallery),
                  ],
                ),
                SizedBox(height: 20),
                SizedBox(
                  width: fullWidth * 0.8,
                  child: ElevatedButton(
                    onPressed: () {
                      Navigator.pushReplacement(context, MaterialPageRoute(builder: (context) => UploadLicence()));
                    },
                    style: ElevatedButton.styleFrom(
                      backgroundColor: AppColor.primaryColor,
                      padding: EdgeInsets.symmetric(vertical: 12),
                      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(8)),
                    ),
                    child: Text("Submit", style: TextStyle(color: Colors.white, fontSize: 16)),
                  ),
                ),
                SizedBox(height: 50),
              ],
            ),
          ],
        ),
      ),

    );
  }

  // Custom Button for Taking Image / Uploading from Gallery
  Widget _customOutlinedButton(String text, IconData icon, ImageSource source) {
    return OutlinedButton.icon(
      onPressed: () => _pickImage(source),
      icon: Icon(icon, color: AppColor.primaryColor),
      label: Text(text, style: TextStyle(color: AppColor.primaryColor)),
      style: OutlinedButton.styleFrom(
        side: BorderSide(color: AppColor.primaryColor),
        padding: EdgeInsets.symmetric(horizontal: 12, vertical: 10),
      ),
    );
  }
}
