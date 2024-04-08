import 'package:flutter/material.dart';
import 'package:mobile/homepage.dart';
import 'token.dart';

class VerificationPage extends StatefulWidget {
  const VerificationPage({super.key});

  @override
  createState() => _VerificationPageState();
}

class _VerificationPageState extends State<VerificationPage> {
  @override
  void initState() {
    super.initState();
    // Call sendVerification when the page is initialized
  }

  String _verificationCode = '';
  String _email = ''; // Added email field

  void _handleVerificationCode(String value) {
    setState(() {
      _verificationCode = value;
    });
  }

  void _handleEmail(String value) {
    setState(() {
      _email = value;
    });
  }

  void _handleSubmit(BuildContext context) async {
    try {
      await verifyUser(_verificationCode);

      Navigator.pushReplacement(
        context,
        MaterialPageRoute(builder: (context) => HomePageScreen()),
      );
    } catch (e) {
      if (!context.mounted) return;
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(
          content: Text('An error occurred. Please try again later.'),
        ),
      );
    }
  }

  void _handleSendCode(BuildContext context) async {
    final currentContext = context;
    try {
      //await sendCode(_email); // Pass email to sendCode function
    } catch (e) {
      if (!currentContext.mounted) return;
      ScaffoldMessenger.of(currentContext).showSnackBar(
        const SnackBar(
          content: Text('An error occurred. Please try again...'),
        ),
      );
    }
  }

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
              SizedBox(height: 15), // Added SizedBox
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
              ), // Added Align
              const SizedBox(height: 30.0),
              const Text(
                'Enter Email:',
                style: TextStyle(
                  fontSize: 18.0,
                  fontWeight: FontWeight.bold,
                ),
              ),
              const SizedBox(height: 10.0),
              TextField(
                onChanged: _handleEmail,
                decoration: InputDecoration(
                  border: OutlineInputBorder(
                    borderRadius: BorderRadius.circular(10.0),
                  ),
                  hintText: 'Example@email.com',
                  hintStyle: const TextStyle(
                    color: Colors.black54,
                    fontFamily: 'Arial Narrow',
                  ),
                  contentPadding: const EdgeInsets.symmetric(
                      vertical: 15.0, horizontal: 12.0),
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
              const Text(
                'Enter Verification Code:',
                style: TextStyle(
                  fontSize: 18.0,
                  fontWeight: FontWeight.bold,
                ),
              ),
              const SizedBox(height: 10.0),
              TextField(
                onChanged: _handleVerificationCode,
                decoration: InputDecoration(
                  border: OutlineInputBorder(
                    borderRadius: BorderRadius.circular(10.0),
                  ),
                  hintText: 'Verification Code',
                  hintStyle: const TextStyle(
                    color: Colors.black54,
                    fontFamily: 'Arial Narrow',
                  ),
                  contentPadding: const EdgeInsets.symmetric(
                      vertical: 15.0, horizontal: 12.0),
                ),
              ),
              const SizedBox(height: 20.0),
              ElevatedButton(
                onPressed: () => _handleSendCode(context),
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
                    'Submit Code',
                    style: TextStyle(
                      color: Colors.white,
                      fontSize: 18,
                      fontFamily: 'Arial Narrow',
                    ),
                    textAlign: TextAlign.center,
                  ),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
