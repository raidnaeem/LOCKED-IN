import 'package:flutter/material.dart';

import 'main.dart';
import 'token.dart';

class ResetPage extends StatefulWidget {
  const ResetPage({super.key});

  @override
  _ResetPageState createState() => _ResetPageState();
}

class _ResetPageState extends State<ResetPage> {
  String email = '';

  void _handleEmailChange(String newEmail) {
    setState(() {
      email = newEmail;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Password Reset'),
      ),
      body: Center(
        child: SingleChildScrollView(
          child: Container(
            padding: const EdgeInsets.all(20.0),
            width: MediaQuery.of(context).size.width * 0.8,
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              crossAxisAlignment: CrossAxisAlignment.center,
              children: [
                SizedBox(height: 15),
                Align(
                  alignment: Alignment.center,
                  child: Text(
                    'LockedIn',
                    style: TextStyle(
                      color: Colors.black,
                      fontWeight: FontWeight.w900,
                      fontSize: 53,
                      fontFamily: 'Poppins',
                    ),
                  ),
                ),
                const SizedBox(height: 30.0),
                const Center(
                  child: Text(
                    "Enter an Email to Receive a Password Reset Link:",
                    style: TextStyle(
                      fontSize: 18.0,
                      fontWeight: FontWeight.bold,
                    ),
                    textAlign: TextAlign
                        .center, // Optional, to center the text within its container
                  ),
                ),
                const SizedBox(height: 30.0),
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
                const SizedBox(height: 30.0),
                ElevatedButton(
                  onPressed: () => _handleSubmit(context),
                  style: ElevatedButton.styleFrom(
                    backgroundColor: const Color(0xFF14532d).withBlue(255),
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(10),
                    ),
                    padding: const EdgeInsets.symmetric(vertical: 13.0),
                  ),
                  child: const SizedBox(
                    width: 350,
                    child: Text(
                      'Send Email',
                      style: TextStyle(
                        color: Colors.white,
                        fontSize: 18,
                        fontFamily: 'Poppins',
                      ),
                      textAlign: TextAlign.center,
                    ),
                  ),
                ),
                const SizedBox(height: 30.0),
              ],
            ),
          ),
        ),
      ),
    );
  }

  void _handleSubmit(BuildContext context) async {
    try {
      await requestPasswordReset(email); // Assuming `code` is defined somewhere
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

      print(validEmail);

      if (validEmail == 200) {
        Future.delayed(Duration(seconds: 5), () {
          Navigator.push(
            context,
            MaterialPageRoute(builder: (context) => const LoginPage()),
          );
        });
      }
    }
  }
}
