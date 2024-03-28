import 'package:flutter/material.dart';
import 'package:mobile/screens/login_screen.dart';
class Routes {
  static const String LOGINSCREEN = '/login';
  // routes of pages in the app
  static Map<String, Widget Function(BuildContext)> get getroutes => {
  '/': (context) => LoginScreen(),
    LOGINSCREEN: (context) => LoginScreen(),
  };
}