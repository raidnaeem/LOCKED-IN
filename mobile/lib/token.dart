import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:jwt_decoder/jwt_decoder.dart';

dynamic token;
late String userId;
dynamic decodedToken;

Future<void> signUp(
    String firstName, String lastName, String email, String password) async {
  final Uri url =
  Uri.parse('https://locked-in-561ee2a901c9.herokuapp.com/api/register');
  final Map<String, String> body = {
    'firstName': firstName,
    'lastName': lastName,
    'email': email,
    'password': password,
  };

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
      token = jsonResponse['token']; // Extracting the token string
      decodedToken = JwtDecoder.decode(token);

      //userId
      userId = decodedToken['userId'];
    } else {
      // Signup failed
      throw 'Signup failed';
    }
  } catch (e) {
    // Exception occurred
    throw 'Signup failed';
  }
}

Future<void> login(String email, String password) async {
  final Uri url = Uri.parse('https://locked-in-561ee2a901c9.herokuapp.com/api/login');
  final Map<String, String> body = {
    'Email': email,
    'Password': password,
  };
  print(email);
  print(password);

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
      token = jsonResponse['verified']; // Extracting the token string
      print(token);

    } else {
      print(response.statusCode);
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
      print(jsonResponse);
      var sent = jsonResponse['sent'];

      if (sent == false) {
        throw Exception('Failed to send verification code');
      }
    }
  } catch (e) {
    // Exception occurred
    print('$e');
    // You might want to handle this error in your UI
  }
}

Future<void> verifyUser(String code) async {
  final Uri url = Uri.parse(
      'https://locked-in-561ee2a901c9.herokuapp.com/api/verifyUser');
  final Map<String, String> body = {
    'id': userId,
    'code': code,
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
      var verified = jsonResponse['verified'];

      if (verified == false) {
        throw 'Unable to Verify User';
      }
    }
  }
  catch (e) {
    // Exception occurred
  }
}





