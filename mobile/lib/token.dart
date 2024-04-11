import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:sendgrid_mailer/sendgrid_mailer.dart';
const String sendgridApiKey = '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';

dynamic token;
dynamic verify;
dynamic sent;
late String userId;
String emailVerify = '';
String code = '';

Future<void> signUp(
    String firstName, String lastName, String email, String password) async {
  final Uri url =
  Uri.parse('https://locked-in-561ee2a901c9.herokuapp.com/api/register');
  final Map<String, String> body = {
    'Email': email,
    'Password': password,
    'FirstName': firstName,
    'LastName': lastName,
  };

  emailVerify = email;

  try {
    final response = await http.post(
      url,
      headers: <String, String>{
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: json.encode(body),
    );

    if (response.statusCode == 201) {
      final jsonResponse = json.decode(response.body);
      verify = jsonResponse['verified']; // Extracting the token string
      code = jsonResponse['AccessToken'];
    }

    else if (response.statusCode == 400) {
      throw 'User Already Exists With The Provided Email.';
    }

    else {
      throw 'Register Failed';
    }

  }

  catch (e) {
    // Exception occurred
  }
}

Future<void> login(String email, String password) async {
  final Uri url = Uri.parse('https://locked-in-561ee2a901c9.herokuapp.com/api/login');
  final Map<String, String> body = {
    'Email': email,
    'Password': password,
  };

  emailVerify = email;

  try {
    final response = await http.post(
      url,
      headers: <String, String>{
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: json.encode(body),
    );

    print(response.statusCode);

    if (response.statusCode == 200) {
      final jsonResponse = json.decode(response.body);
      verify = jsonResponse['verified']; // Extracting the token string
      code = jsonResponse['AccessToken'];
    }

    else if (response.statusCode == 400) {
      throw 'Invalid Username or Password, Please Try Again';
    }

  } catch (e) {
    throw 'Invalid Username or Password, Please Try Again';
  }
}

Future<void> sendCode() async {
  final Uri url = Uri.parse(
      'https://locked-in-561ee2a901c9.herokuapp.com/api/sendVerification');
  final Map<String, String> body = {
    'id': userId,
  };

  try {
    final response = await http.post(
      url,
      headers: <String, String>{
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: json.encode(body),
    );

    if (response.statusCode == 200) {
      final jsonResponse = json.decode(response.body);
      var sent = jsonResponse['sent'];

      if (sent == false) {
        throw Exception('Failed to Send Verification Code');
      }
    }
  } catch (e) {
    // Exception occurred
    print('$e');
    // You might want to handle this error in your UI
  }
}

Future<void> verifyUser(String email, String verificationToken) async {
  final String verificationUrl = 'https://locked-in-561ee2a901c9.herokuapp.com/verify-email/$verificationToken';
  final Map<String, dynamic> message = {
    'personalizations': [
      {
        'to': [
          {'email': email}
        ],
      }
    ],
    'from': {'email': 'lockedin123@myyahoo.com'},
    'subject': 'Verify Your Email Address',
    'content': [
      {
        'type': 'text/plain',
        'value': 'Please verify your email by clicking on the link: $verificationUrl',
      }
    ]
  };

  final Uri sendgridUrl = Uri.parse('https://api.sendgrid.com/v3/mail/send');

  const String sendgridApiKey = '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';

  try {
    final response = await http.post(
      sendgridUrl,
      headers: <String, String>{
        'Authorization': 'Bearer $sendgridApiKey',
        'Content-Type': 'application/json',
      },
      body: jsonEncode(message),
    );

    sent = response.statusCode;

    if (response.statusCode == 202) {
      throw 'Verification Email Sent Successfully.\nPlease Check Your Email.';
    } else {
      throw 'Failed to Send Verification Email. Status Code: ${response.statusCode}';
    }
  } catch (error) {
    throw '$error';
  }
}
