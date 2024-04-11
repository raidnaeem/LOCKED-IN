import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:sendgrid_mailer/sendgrid_mailer.dart';

dynamic token;
dynamic verify;
dynamic sent;
dynamic validEmail;
late String userId;

String emailVerify = '';
String code = '';
String passwordResetToken = '';

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

Future<void> requestPasswordReset(String email) async {
  const String apiUrl = 'https://locked-in-561ee2a901c9.herokuapp.com/api/request-password-reset';
  final Map<String, String> requestBody = {'Email': email};

  try {
    final response = await http.post(
      Uri.parse(apiUrl),
      headers: <String, String>{'Content-Type': 'application/json'},
      body: jsonEncode(requestBody),
    );

    validEmail = response.statusCode;

    if (response.statusCode == 200) {
      throw 'User Found.';
    } else if (response.statusCode == 404) {
      throw 'User not found.';
    } else {
      throw 'Failed to request password reset. Status Code: ${response.statusCode}';
    }
  } catch (error) {
    throw '$error';
  }
}


Future<void> sendPasswordResetEmail(String email, String passwordResetToken) async {
  const String apiUrl = 'https://locked-in-561ee2a901c9.herokuapp.com/api/reset-password/:passwordResetToken';
  final Map<String, String> requestBody =
  {'Email': email, 'passwordResetToken': passwordResetToken};

  try {
    final response = await http.post(
      Uri.parse(apiUrl),
      headers: <String, String>{'Content-Type': 'application/json'},
      body: jsonEncode(requestBody),
    );

    if (response.statusCode == 200) {
      throw 'Password Reset Successfully.';
    } else {
      throw 'Failed to request password reset. Status Code: ${response.statusCode}';
    }
  } catch (error) {
    throw '$error';
  }
}

Future<void> verifyUser(String email, String verificationToken) async {
  final String verificationUrl = 'https://locked-in-561ee2a901c9.herokuapp.com/verify-email/$verificationToken';

  try {
    final response = await http.post(
      Uri.parse(verificationUrl),
    );

    throw 'Verification Email Sent Successfully.\nPlease Check Your Email.';

  } catch (error) {
    throw '$error';
  }
}
