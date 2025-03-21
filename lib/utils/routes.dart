
import 'package:droute_driver_frontend/screens/driver/home.dart';
import 'package:flutter/material.dart';
import 'package:droute_driver_frontend/screens/auth/signup.dart';
import 'package:droute_driver_frontend/screens/auth/signin.dart';
import 'package:droute_driver_frontend/screens/auth/otp_page.dart';
import 'package:droute_driver_frontend/screens/auth/forget_password.dart';
 import 'package:droute_driver_frontend/screens/driver/terms_condition.dart';


final Map<String, WidgetBuilder> appRoutes = {
  '/signup': (context) => const SignUpPage(),
  '/signin': (context) => const SignInPage(),
  '/otp': (context) => const OtpPage(),
  '/forget-password': (context) => const ForgetPassword(),
  '/t&c': (context) => TermsAndConditionsPage(),
  '/home':(context) => Home(),


};
