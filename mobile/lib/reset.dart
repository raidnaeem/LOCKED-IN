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

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Email Verification'),
      ),
      body: Center(
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
                    fontSize: 60,
                    fontFamily: 'Arial Narrow',
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
                  textAlign: TextAlign.center, // Optional, to center the text within its container
                ),
              ),
              const SizedBox(height: 20.0),
              TextField(
                onChanged: (value) {
                  setState(() {
                    email = value;
                  });
                },
                decoration: const InputDecoration(
                  labelText: 'Example@email.com',
                  border: OutlineInputBorder(),
                ),
              ),
              const SizedBox(height: 20.0),
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
                      fontFamily: 'Arial Narrow',
                    ),
                    textAlign: TextAlign.center,
                  ),
                ),
              ),
              const SizedBox(height: 40.0),
            ],
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
          content: Center(
            child: Text(
              '$e',
              textAlign: TextAlign.center,
            ),
          ),
          duration: const Duration(seconds: 5),
        ),
      );
    }
  }
}
