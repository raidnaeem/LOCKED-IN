import 'dart:convert';

import 'package:http/http.dart' as http;

dynamic token;
dynamic verify;
dynamic sent;
dynamic validEmail;
dynamic userId;
dynamic taskId;

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
    } else if (response.statusCode == 400) {
      throw 'User Already Exists With The Provided Email.';
    } else {
      throw 'Register Failed';
    }
  } catch (e) {}
}

Future<void> login(String email, String password) async {
  final Uri url =
      Uri.parse('https://locked-in-561ee2a901c9.herokuapp.com/api/login');
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

    if (response.statusCode == 200) {
      final jsonResponse = json.decode(response.body);
      userId = jsonResponse['UserID'];
      verify = jsonResponse['verified']; // Extracting the token string
      code = jsonResponse['AccessToken'];
    } else if (response.statusCode == 400) {
      throw 'Invalid Username or Password, Please Try Again';
    }
  } catch (e) {
    throw 'Invalid Username or Password, Please Try Again';
  }
}

Future<void> requestPasswordReset(String email) async {
  const String apiUrl =
      'https://locked-in-561ee2a901c9.herokuapp.com/api/request-password-reset';
  final Map<String, String> requestBody = {'Email': email};

  try {
    final response = await http.post(
      Uri.parse(apiUrl),
      headers: <String, String>{'Content-Type': 'application/json'},
      body: jsonEncode(requestBody),
    );

    validEmail = response.statusCode;

    if (response.statusCode == 200) {
      throw 'Password Reset Email Sent.';
    } else if (response.statusCode == 404) {
      throw 'Email Not Recognized.';
    } else {
      throw 'Failed to Request Password Reset. Status Code: ${response.statusCode}';
    }
  } catch (error) {
    throw '$error';
  }
}

Future<void> sendPasswordResetEmail(
    String email, String passwordResetToken) async {
  const String apiUrl =
      'https://locked-in-561ee2a901c9.herokuapp.com/api/reset-password/:passwordResetToken';
  final Map<String, String> requestBody = {
    'Email': email,
    'passwordResetToken': passwordResetToken
  };

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
  final String verificationUrl =
      'https://locked-in-561ee2a901c9.herokuapp.com/verify-email/$verificationToken';

  try {
    final response = await http.post(
      Uri.parse(verificationUrl),
    );

    throw 'Verification Email Sent Successfully.\nPlease Check Your Email.';
  } catch (error) {
    throw '$error';
  }
}

Future<String> addTask(
    String task, String taskImage, bool done, int userId) async {
  const String apiUrl =
      'https://locked-in-561ee2a901c9.herokuapp.com/api/task/add';

  final Map<String, dynamic> requestBody = {
    'Task': task,
    'TaskImage': null, // Ensure this object is structured correctly
    'Done': done,
    'UserID': userId
  };

  try {
    final response = await http.post(
      Uri.parse(apiUrl),
      headers: <String, String>{'Content-Type': 'application/json'},
      body: jsonEncode(requestBody),
    );

    if (response.statusCode == 200) {
      final jsonResponse = json.decode(response.body);
      final taskId = jsonResponse['TaskID'] as String;
      return taskId;
      throw 'Task added successfully';
    } else {
      throw 'Failed to add task. Status Code: ${response.statusCode}';
    }
  } catch (error) {
    throw '$error';
  }
}

Future<List<dynamic>> searchTasks(String query, int userID) async {
  int page = 1;
  const String apiUrl =
      'https://locked-in-561ee2a901c9.herokuapp.com/api/todo/search';

  final Map<String, dynamic> queryParams = {
    'query': query,
    'userID': userID.toString(),
    'page': page.toString(),
    'pageSize': '5',
  };

  final Uri uri = Uri.parse(apiUrl).replace(queryParameters: queryParams);

  try {
    final response = await http.get(uri);
    return jsonDecode(response.body);
  } catch (error) {
    throw '$error';
  }
}

Future<void> deleteTask(String taskID) async {
  const baseUrl =
      'https://locked-in-561ee2a901c9.herokuapp.com'; // Replace with your API base URL
  final endpoint = '/api/task/delete/$taskID';

  try {
    final response = await http.delete(Uri.parse(baseUrl + endpoint));

    if (response.statusCode == 200) {
      print('Task deleted successfully');
    } else if (response.statusCode == 404) {
      print('Task not found');
    } else {
      print('Error deleting task: ${response.body}');
    }
  } catch (error) {
    print('An error occurred while deleting the task: $error');
  }
}

Future<void> updateTask(String taskId, String newText) async {
  print(newText);
  final baseUrl =
      'https://locked-in-561ee2a901c9.herokuapp.com'; // Replace with your API base URL
  final endpoint = '/api/task/update/$taskId';

  final updateFields = {'Task': newText}; // Construct update fields

  try {
    final response = await http.put(
      Uri.parse(baseUrl + endpoint),
      headers: <String, String>{'Content-Type': 'application/json'},
      body: jsonEncode(updateFields),
    );

    if (response.statusCode == 200) {
      throw ('Task updated successfully: ${response.statusCode}');
    } else if (response.statusCode == 404) {
      throw ('Task not found');
    } else if (response.statusCode == 304) {
      throw ('Task not modified');
    } else {
      print('Error updating task: ${response.statusCode}');
    }
  } catch (error) {
    print('$error');
  }
}
