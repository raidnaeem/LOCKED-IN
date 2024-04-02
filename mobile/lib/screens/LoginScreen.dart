// ignore: file_names
import 'package:flutter/material.dart';
import 'package:mobile/screens/CardScreen.dart';
import 'package:mobile/util/getAPI.dart';
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
    return SizedBox(
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
          Row(
            children: <Widget>[
              ElevatedButton(
                onPressed: () async
                    {
                      newMessageText = "";
                      changeText();

                      String payload = '{"login":"$loginName.trim()","password":"$password.trim()"}';
                      var userId = -1;
                      var jsonObject = {};

                      try
                      {
                        String url = 'https://locked-in-561ee2a901c9.herokuapp.com/api/login';
                        String ret = await CardsData.getJson(url, payload);
                        jsonObject = json.decode(ret);
                        userId = jsonObject["id"];
                      }
                      catch(e)
                      {
                        newMessageText = e.toString();
                        changeText();	
                        return;
                      }
                      if( userId <= 0 )
                      {
                        newMessageText = "Incorrect Login/Password";
                        changeText();
                      }
                      else
                      {
                        //GlobalData.userId = userId;
                        //GlobalData.firstName = jsonObject["firstName"];
                        //GlobalData.lastName = jsonObject["lastName"];
                        //GlobalData.loginName = loginName;
                        //GlobalData.password = password;
                        //Navigator.pushNamed(context, '/main.dart');
                        MaterialPageRoute(builder: (context) => '/main.dart')
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
    );
  }
}

class MainPage extends StatefulWidget {
@override
State<MainPage> createState() {
    return _MainPageState();
  }
}

class _MainPageState extends State<MainPage> {
@override
  void initState() {
  super.initState();
}

@override
Widget build(BuildContext context) {
  return Container();
}

changeText() {
  setState(() {
    message = newMessageText;
  });
}}