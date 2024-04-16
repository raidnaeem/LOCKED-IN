import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';

import '../homepage.dart';
import '../main.dart';
import '../register.dart';
import '../verification.dart';

void main() {
  // Unit Testing
  group('Password Validation', () {
    test('Empty password should return error message', () {
      final errorMessage = validatePassword('');
      print('Empty password error: $errorMessage');
      expect(errorMessage, 'Please enter a password');
    });

    test('Short password should return error message', () {
      final errorMessage = validatePassword('pass');
      print('Short password error: $errorMessage');
      expect(errorMessage, 'Password must be between 8 and 20 characters');
    });

    test('Long password should return error message', () {
      final errorMessage = validatePassword('passwordpasswordpassword');
      print('Long password error: $errorMessage');
      expect(errorMessage, 'Password must be between 8 and 20 characters');
    });

    test('Password without uppercase letter should return error message', () {
      final errorMessage = validatePassword('password');
      print('No uppercase letter error: $errorMessage');
      expect(
          errorMessage, 'Password must contain at least one uppercase letter');
    });

    test('Password without number should return error message', () {
      final errorMessage = validatePassword('Password');
      print('No number error: $errorMessage');
      expect(errorMessage, 'Password must contain at least one number');
    });

    test('Password without special character should return error message', () {
      final errorMessage = validatePassword('Password1');
      print('No special character error: $errorMessage');
      expect(
          errorMessage, 'Password must contain at least one special character');
    });

    test('Valid password should return null', () {
      final errorMessage = validatePassword('Password1!');
      print('Valid password: $errorMessage');
      expect(errorMessage, isNull);
    });
  });

  // Integration Testing
  group('LoginPage', () {
    testWidgets('Successful login redirects to HomePage',
        (WidgetTester tester) async {
      await tester.pumpWidget(const MaterialApp(home: LoginPage()));

      // Assuming you have TextFormField widgets with keys, find them and enter text
      await tester.enterText(
          find.byKey(const Key('email_field')), 'rivbii@vistaemail.com');
      await tester.enterText(
          find.byKey(const Key('password_field')), 'avoidingthepuddle');

      // Simulate tap on the login button
      await tester.tap(find.text('Login'));
      await tester.pumpAndSettle();

      // Check if HomePageScreen is found
      expect(find.byType(HomePageScreen), findsOneWidget);

      // Print console output
      debugPrint('Successful login test completed');
    });

    testWidgets('Unsuccessful login redirects to VerificationPage',
        (WidgetTester tester) async {
      await tester.pumpWidget(const MaterialApp(home: LoginPage()));

      // Assuming you have TextFormField widgets with keys, find them and enter text
      await tester.enterText(
          find.byKey(const Key('email_field')), 'example@email.com');
      await tester.enterText(
          find.byKey(const Key('password_field')), 'password');

      // Simulate tap on the login button
      await tester.tap(find.text('Login'));
      await tester.pumpAndSettle();

      // Check if VerificationPage is found
      expect(find.byType(VerificationPage), findsOneWidget);

      // Print console output
      debugPrint('Unsuccessful login test completed');
    });
  });
}
