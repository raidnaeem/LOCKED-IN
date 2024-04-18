import 'package:flutter/material.dart';
import 'package:mobile/homepage.dart';

import 'register.dart';
import 'reset.dart';
import 'token.dart';
import 'verification.dart';

class LoginPage extends StatefulWidget {
  const LoginPage({super.key});

  @override
  createState() => _LoginPageState();
}

String _email = '';
String _password = '';

class _LoginPageState extends State<LoginPage> {
  void _handleEmailChange(String value) {
    setState(() {
      _email = value;
    });
  }

  void _handlePasswordChange(String value) {
    setState(() {
      _password = value;
    });
  }

  Future<void> _handleSubmit(context) async {
    try {
      if (_email == '' || _password == '') {
        throw "Empty Email/Password Field";
      }
      await login(_email, _password);

      if (verify == true) {
        Navigator.push(
          context,
          MaterialPageRoute(builder: (context) => HomePageScreen()),
        );
      } else if (verify == false) {
        Navigator.push(
          context,
          MaterialPageRoute(builder: (context) => const VerificationPage()),
        );
      }
    } catch (e) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          backgroundColor: Colors.red, // Set background color to red
          content: Center(
            child: Text(
              '$e', // Convert the error to a string to display
              textAlign: TextAlign.center, // Center the text horizontally
              style: const TextStyle(
                fontFamily: 'Poppins', // Use the Poppins font
                fontSize: 18, // Set the font size to 18
                fontWeight: FontWeight.bold, // Set the font weight to bold
                color: Colors.white, // Set text color to white
              ),
            ),
          ),
          duration: const Duration(seconds: 5), // Adjust the duration as needed
        ),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
        debugShowCheckedModeBanner: false,
        home: Scaffold(
      backgroundColor: Colors.white,
      body: Center(
        child: SingleChildScrollView(
          padding: const EdgeInsets.all(16.0),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              const Text(
                'LockedIn',
                style: TextStyle(
                  color: Colors.black,
                  fontWeight: FontWeight.w900,
                  fontSize: 60,
                  fontFamily: 'Poppins',
                ),
              ),
              const SizedBox(height: 25.0),
              Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  const Text(
                    'Email',
                    style: TextStyle(
                      fontSize: 16.0,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  SizedBox(
                    width: 350, // Set width of the container
                    child: Container(
                      color: Colors.grey[200],
                      child: TextFormField(
                        onChanged: _handleEmailChange,
                        obscureText: false,
                        decoration: InputDecoration(
                          hintText: 'Example@email.com',
                          hintStyle: const TextStyle(
                              color: Colors.black54, fontFamily: 'Poppins'),
                          border: OutlineInputBorder(
                            borderRadius: BorderRadius.circular(10.0),
                          ),
                          contentPadding:
                              const EdgeInsets.fromLTRB(12.0, 8.0, 12.0, 8.0),
                        ),
                      ),
                    ),
                  ),
                ],
              ),
              const SizedBox(height: 25.0),
              Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  const Text(
                    'Password',
                    style: TextStyle(
                      fontSize: 16.0,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  SizedBox(
                    width: 350, // Set width of the container
                    child: Container(
                      color: Colors.grey[200],
                      child: TextFormField(
                        onChanged: _handlePasswordChange,
                        obscureText: true,
                        decoration: InputDecoration(
                          hintText: 'Enter your password',
                          hintStyle: const TextStyle(
                              color: Colors.black54, fontFamily: 'Poppins'),
                          border: OutlineInputBorder(
                            borderRadius: BorderRadius.circular(10.0),
                          ),
                          contentPadding:
                              const EdgeInsets.fromLTRB(12.0, 8.0, 12.0, 8.0),
                        ),
                      ),
                    ),
                  ),
                ],
              ),
              Align(
                alignment: Alignment.centerLeft,
                child: TextButton(
                  onPressed: () {
                    Navigator.push(
                      context,
                      MaterialPageRoute(
                          builder: (context) => const ResetPage()),
                    );
                  },
                  child: const Text(
                    'Forgot password?',
                    style: TextStyle(color: Colors.blue, fontSize: 17),
                  ),
                ),
              ),
              const SizedBox(height: 20.0),
              Builder(
                builder: (context) => MaterialButton(
                  onPressed: () => _handleSubmit(context),
                  color: const Color(0xFF14532d).withBlue(255),
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(10),
                  ),
                  padding: const EdgeInsets.symmetric(vertical: 13.0),
                  child: const SizedBox(
                    width: 350,
                    child: Text(
                      'Login',
                      style: TextStyle(
                          color: Colors.white,
                          fontSize: 18,
                          fontFamily: 'Poppins'),
                      textAlign: TextAlign.center,
                    ),
                  ),
                ),
              ),
              const SizedBox(height: 20.0),
              TextButton(
                onPressed: () {
                  Navigator.push(
                    context,
                    MaterialPageRoute(builder: (context) => const Register()),
                  );
                },
                child: const Text(
                  'Need an account? Sign up',
                  style: TextStyle(
                    color: Colors.blue,
                    fontFamily: 'Poppins',
                    fontSize: 18,
                  ),
                ),
              ),
            ],
          ),
        ),
      ),
    ));
  }
}

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'LockedIn',
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: Colors.deepPurple),
        useMaterial3: true,
      ),
      home: const LoginPage(),
    );
  }
}
