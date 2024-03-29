import 'package:flutter/material.dart';
class LoginScreen extends StatefulWidget {
@override
_LoginScreenState createState() => _LoginScreenState();
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
    return Container(
      width: 200,
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        crossAxisAlignment: CrossAxisAlignment.center,
        children: <Widget>[
          Row(
            children: <Widget>[
              Container(
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
              Container(
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
                onPressed: () {
                  // Use loginName and password variables as needed
                  Navigator.pushNamed(context, '/cards');
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
_MainPageState createState() => _MainPageState();
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
}
