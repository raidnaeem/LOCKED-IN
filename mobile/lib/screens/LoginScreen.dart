// ignore: file_names
import 'package:flutter/material.dart';
import 'package:mobile/screens/CardScreen.dart';
//import 'package:mobile/util/getAPI.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';

class LoginScreen extends StatefulWidget {
  @override
  State<LoginScreen> createState() {
    return _LoginScreenState();
  }
}

String message = "This is a message", newMessageText='';

Future<String> getJson(String url, String outgoing) async
{
  String ret = "";

  try
  {
    http.Response response = await http.post(Uri(path: url),
        body: utf8.encode(outgoing),
        headers:
        {
          "Accept": "application/json",
          "Content-Type": "application/json",
        },
        encoding: Encoding.getByName("utf-8")
    );
    ret = response.body;
  }
  catch (e)
  {
    //print(e.toString());
  }

  return ret;
}

class _LoginScreenState extends State<LoginScreen> {
  String message = "This is a message";
  String newMessageText = '';
  String loginName = '';
  String password = '';

  void changeText() {
    setState(() {
      message = newMessageText;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white, // Set the background color to white
      body: Center( // Center the content vertically
        child: SizedBox(
          width: 200,
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            crossAxisAlignment: CrossAxisAlignment.center,
            children: <Widget>[
              Row(
                children: <Widget>[
                  SizedBox(
                    width: 200,
                    child: Material(
                      // Ensure TextField has a Material ancestor
                      child: TextField(
                        onChanged: (value) {
                          setState(() {
                            loginName = value;
                          });
                        },
                        decoration: const InputDecoration(
                          filled: true,
                          fillColor: Colors.white,
                          border: OutlineInputBorder(),
                          labelText: 'Login Name',
                          hintText: 'Enter Your Login Name',
                        ),
                      ),
                    ),
                  ),
                ],
              ),
              SizedBox(height: 16), // Add spacing between login field and password field
              Row(
                children: <Widget>[
                  SizedBox(
                    width: 200,
                    child: Material(
                      // Ensure TextField has a Material ancestor
                      child: TextField(
                        onChanged: (value) {
                          setState(() {
                            password = value;
                          });
                        },
                        obscureText: true,
                        decoration: const InputDecoration(
                          filled: true,
                          fillColor: Colors.white,
                          border: OutlineInputBorder(),
                          labelText: 'Password',
                          hintText: 'Enter Your Password',
                        ),
                      ),
                    ),
                  ),
                ],
              ),
              SizedBox(height: 16), // Add spacing between password field and button
              Row(
                children: <Widget>[
                  ElevatedButton(
                    onPressed: () async {
                      newMessageText = "";
                      changeText();

                      String payload =
                          '{"login":"$loginName.trim()","password":"$password.trim()"}';
                      var userId = -1;
                      var jsonObject = {};

                      try {
                        String url =
                            'https://your-authentication-endpoint.com/api/login'; // Replace with your actual API endpoint URL
                        String ret = await getJson(url, payload);
                        jsonObject = json.decode(ret);
                        userId = jsonObject["id"];
                      } catch (e) {
                        newMessageText = 'An error occurred: $e';
                        changeText();
                        return;
                      }

                      if (userId <= 0) {
                        newMessageText = "Incorrect Login/Password";
                        changeText();
                      } else {
                        // Process user data and navigate to the next screen
                      }
                    },

                    style: ButtonStyle(
                      backgroundColor: MaterialStateProperty.all(Colors.brown[50]), // Background color
                      foregroundColor: MaterialStateProperty.all(Colors.black), // Text color
                      padding: MaterialStateProperty.all(EdgeInsets.all(12.0)), // Button padding
                      textStyle: MaterialStateProperty.all(TextStyle(fontSize: 14)), // Text style
                      overlayColor: MaterialStateProperty.all(Colors.grey[100]), // Splash color
                    ),
                    child: Text('Do Login'),
                  ),
                ],
              ),
            ],
          ),
        ),
      ),
    );
  }
}
