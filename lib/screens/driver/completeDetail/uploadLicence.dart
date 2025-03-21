import 'dart:io';
import 'package:flutter/material.dart';
import 'package:image_picker/image_picker.dart';
import 'package:dotted_border/dotted_border.dart';
import 'package:droute_driver_frontend/styles/color/app_color.dart';
import 'package:droute_driver_frontend/styles/custom_widgets/complete_detail_progress_bar.dart';

class UploadLicence extends StatefulWidget {
  const UploadLicence({super.key});

  @override
  _UploadLicenceState createState() => _UploadLicenceState();
}

class _UploadLicenceState extends State<UploadLicence> {
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
          'Upload Licence',
          style: TextStyle(
            color: Colors.black,
            fontSize: 20,
            fontWeight: FontWeight.w500,
          ),
        ),
      ),
      body: Column(
        children: [
          Row(
            children: [
              CompleteDetailProgressBar(completedSteps: 1),
            ],
          ),
          Expanded(
            child: Center(
              child:  DottedBorder(
                color: AppColor.primaryColor,
                strokeWidth: 2,
                dashPattern: [6, 3],
                borderType: BorderType.RRect,
                radius: Radius.circular(8),
                child: Container(
                  width: fullWidth * 0.8,
                  height: 200,
                  alignment: Alignment.center,
                  child: _image == null
                      ? Text("Upload Licence", style: TextStyle(color: Colors.black))
                      : Image.file(_image!, fit: BoxFit.contain),
                ),
              ),
            ),

          ),
          Column(
            mainAxisSize: MainAxisSize.min,
            children: [

              // Buttons Row
              Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  _customOutlinedButton("Take Image", Icons.camera_alt, ImageSource.camera),
                  SizedBox(width: 10),
                  _customOutlinedButton("Upload from Gallery", Icons.photo, ImageSource.gallery),
                ],
              ),
              SizedBox(height: 20),
              // Submit Button
              SizedBox(
                width: fullWidth * 0.8,
                child: ElevatedButton(
                  onPressed: () {
                    if (_image != null) {
                      // Handle submit action
                    }
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
