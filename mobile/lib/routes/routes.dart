import 'package:flutter_app/routes/routes.dart';
import 'package:flutter/material.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
// This widget is the root of your application.
    @override
    Widget build(BuildContext context) {
      return MaterialApp(
        title: '',
        debugShowCheckedModeBanner: false,
        theme: ThemeData(),
        routes: Routes.getroutes,
      );
    }
  }
