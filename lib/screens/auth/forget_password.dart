import 'package:flutter/material.dart';
import 'package:droute_driver_frontend/utils/routes.dart';
import 'package:droute_driver_frontend/styles/color/app_color.dart';

class ForgetPassword extends StatefulWidget {
  const ForgetPassword({super.key});

  @override
  State<ForgetPassword> createState() => _ForgetPasswordState();
}

class _ForgetPasswordState extends State<ForgetPassword> {
  final List<TextEditingController> _otpControllers = List.generate(6, (index) => TextEditingController());

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColor.primaryColor,
      body: SafeArea(
        child: SingleChildScrollView(  // Make the whole body scrollable
          child: Column(
            mainAxisAlignment: MainAxisAlignment.end,
            crossAxisAlignment: CrossAxisAlignment.end,
            children: [
              Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Center(
                    child: Image.asset(
                      'assets/images/droute_logo.png',
                      width: 200,
                      height: 200,
                    ),
                  ),
                ],
              ),
              Container(
                margin: EdgeInsets.only(top: 70),
                decoration: BoxDecoration(
                  color: Colors.white,
                  borderRadius: BorderRadius.only(
                    topLeft: Radius.circular(20),
                    topRight: Radius.circular(20),
                  ),
                ),
                padding: const EdgeInsets.all(16),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      "Forgot Password?",
                      style: const TextStyle(
                        fontFamily: 'TimesNewRoman',
                        fontSize: 20,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                    const SizedBox(height: 16),
                    CustomText(text: "Email :"),
                    TextFormField(
                      decoration: InputDecoration(
                        hintText: "Enter Email Id ",
                      ),
                    ),
                    SizedBox(height: 15),
                    InkWell(
                      onTap: () {
                        // Navigate to OTP page
                      },
                      child: Container(
                        margin: EdgeInsets.only(left: 20, right: 20),
                        width: double.infinity,
                        padding: EdgeInsets.symmetric(vertical: 8, horizontal: 20),
                        decoration: BoxDecoration(
                            color: AppColor.primaryColor,
                            borderRadius: BorderRadius.circular(10)),
                        child: Text(
                          "Send OTP",
                          style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold),
                          textAlign: TextAlign.center,
                        ),
                      ),
                    ),
                    SizedBox(height: 15),
                    CustomText(text: "OTP:"),
                    SizedBox(height: 15),

                    Row(
                      mainAxisAlignment: MainAxisAlignment.start,
                      children: [
                        // OTP Input Fields
                        Expanded(
                          child: Row(
                            mainAxisAlignment: MainAxisAlignment.spaceBetween,
                            children: List.generate(6, (index) {
                              return SizedBox(
                                width: 25,
                                height: 25,
                                child: TextField(
                                  controller: _otpControllers[index],
                                  keyboardType: TextInputType.number,
                                  textAlign: TextAlign.center,
                                  maxLength: 1,
                                  style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
                                  decoration: InputDecoration(
                                    border: OutlineInputBorder(
                                      borderRadius: BorderRadius.circular(5),
                                    ),
                                    counterText: "",
                                  ),
                                  onChanged: (value) {
                                    if (value.isNotEmpty && index < 5) {
                                      FocusScope.of(context).nextFocus();
                                    } else if (value.isEmpty && index > 0) {
                                      FocusScope.of(context).previousFocus();
                                    }
                                  },
                                ),
                              );
                            }),
                          ),
                        ),
                        SizedBox(width: 15),
                        // Verify Button
                        InkWell(
                          onTap: () {
                            String otp = _otpControllers.map((e) => e.text).join();
                            print("Entered OTP: $otp");
                            // Add verification logic here
                          },
                          child: Container(
                            padding: EdgeInsets.symmetric(vertical: 3, horizontal: 20),
                            decoration: BoxDecoration(
                              color: AppColor.primaryColor,
                              borderRadius: BorderRadius.circular(5),
                            ),
                            child: Text(
                              "Verify",
                              style: TextStyle(color: Colors.white, fontSize: 16),
                            ),
                          ),
                        ),
                      ],
                    ),
                    SizedBox(height: 15),
                    CustomText(text: "New Password:"),
                    TextFormField(
                      decoration: InputDecoration(
                        hintText: "Enter New Password",
                      ),
                    ),
                    SizedBox(height: 10),
                    CustomText(text: "Confirm New Password:"),
                    TextFormField(
                      decoration: InputDecoration(
                        hintText: "Confirm New Password",
                      ),
                    ),
                    SizedBox(height: 15),
                    InkWell(
                      onTap: () {
                        Navigator.pushNamed(context, '/signin'); // Navigate to sign in page
                      },
                      child: Container(
                        width: double.infinity,
                        padding: EdgeInsets.symmetric(vertical: 10, horizontal: 20),
                        decoration: BoxDecoration(
                            color: AppColor.primaryColor,
                            borderRadius: BorderRadius.circular(10)),
                        child: Text(
                          "Submit",
                          style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold),
                          textAlign: TextAlign.center,
                        ),
                      ),
                    ),
                    SizedBox(height: 10),
                    InkWell(
                      onTap: () {
                        Navigator.pushNamed(context, '/signup');
                      },
                      child: Row(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          const Text(
                            "Don't Have an Account?",
                            style: TextStyle(fontWeight: FontWeight.bold),
                          ),
                          Text(
                            "Sign Up",
                            style: TextStyle(
                              color: AppColor.primaryColor,
                              fontWeight: FontWeight.bold,
                            ),
                          ),
                        ],
                      ),
                    ),
                  ],
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

Widget CustomText({required String text}) {
  return Text(
    text,
    style: const TextStyle(
      fontWeight: FontWeight.bold,
      fontSize: 16,
    ),
  );
}
