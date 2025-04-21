import 'package:droute_driver_frontend/styles/custom_widgets/complete_detail_progress_bar.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:droute_driver_frontend/styles/color/app_color.dart';

class CompleteDetailForm extends StatefulWidget {
  const CompleteDetailForm({Key? key}) : super(key: key);

  @override
  State<CompleteDetailForm> createState() => _CompleteDetailFormState();
}

class _CompleteDetailFormState extends State<CompleteDetailForm> {
  final _formKey = GlobalKey<FormState>();

  @override
  Widget build(BuildContext context) {
    // Set status bar style before building the widget
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
        elevation: 0,
        systemOverlayStyle: const SystemUiOverlayStyle(
          statusBarColor: AppColor.primaryColor,
          statusBarIconBrightness: Brightness.light,
        ),
        title: const Text(
          'Driver Details',
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
      body: Container(
        color: Colors.white,
        child: SingleChildScrollView(
          child: Padding(
            padding: const EdgeInsets.all(16.0),
            child: Form(
              key: _formKey,
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.stretch,
                children: [
                  CompleteDetailProgressBar(completedSteps: 4),
                  const SizedBox(height: 24),
                  buildTextField(hintText: 'Enter Driver legal name'),
                  const SizedBox(height: 16),
                  buildTextField(hintText: 'Enter public contact Number'),
                  const SizedBox(height: 16),
                  buildTextField(hintText: 'Enter Aadhaar number'),
                  const SizedBox(height: 16),
                  buildTextField(hintText: 'Enter DL number'),
                  const SizedBox(height: 16),
                  buildTextField(hintText: 'Enter RC number'),
                  const SizedBox(height: 16),
                  buildTextField(
                    hintText: 'Home/Street/Locality, City, State, Pincode',
                    maxLines: 2,
                  ),
                  Padding(
                    padding: const EdgeInsets.symmetric(vertical: 24.0),
                    child: Row(
                      children: [
                        const Text(
                          'OR',
                          style: TextStyle(
                            color: AppColor.ThirdColor,
                            fontSize: 16,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                        Expanded(
                          child: Container(
                            margin: const EdgeInsets.only(left: 8.0),
                            height: 1.0,
                            color: Colors.orange,
                          ),
                        ),
                      ],
                    ),
                  ),
                  OutlinedButton(
                    onPressed: () {},
                    style: OutlinedButton.styleFrom(
                      side: const BorderSide(color: AppColor.ThirdColor),
                      padding: const EdgeInsets.symmetric(vertical: 10.0),
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(8.0),
                      ),
                    ),
                    child: const Text(
                      'Select on Map',
                      style: TextStyle(
                        color: AppColor.ThirdColor,
                        fontSize: 14,
                      ),
                    ),
                  ),
                  const SizedBox(height: 24),
                  ElevatedButton(
                    onPressed: () {
                      if (_formKey.currentState!.validate()) {}
                    },
                    style: ElevatedButton.styleFrom(
                      backgroundColor: AppColor.primaryColor,
                      padding: const EdgeInsets.symmetric(vertical: 10.0),
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(8.0),
                      ),
                    ),
                    child: const Text(
                      'Submit',
                      style: TextStyle(
                        color: Colors.white,
                        fontSize: 16,
                      ),
                    ),
                  ),
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }

  Widget buildTextField({required String hintText, int maxLines = 1}) {
    return TextFormField(
      maxLines: maxLines,
      decoration: InputDecoration(
        hintText: hintText,
        hintStyle: TextStyle(
          color: Colors.grey.shade500,
          fontSize: 12.0,
        ),
        filled: true,
        fillColor: Colors.grey.shade100,
        border: OutlineInputBorder(
          borderRadius: BorderRadius.circular(8.0),
          borderSide: BorderSide(color: Colors.grey.shade300),
        ),
        enabledBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(8.0),
          borderSide: BorderSide(color: Colors.grey.shade300),
        ),
        focusedBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(8.0),
          borderSide: BorderSide(color: Colors.grey.shade500),
        ),
        contentPadding: const EdgeInsets.symmetric(
          horizontal: 10.0,
          vertical: 10.0,
        ),
      ),
      validator: (value) {
        if (value == null || value.isEmpty) {
          return 'This field is required';
        }
        return null;
      },
    );
  }
}