import 'package:flutter/material.dart';
import 'package:mobile/main.dart';
class HomePageScreen extends StatefulWidget {
  @override
  _HomePageScreenState createState() => _HomePageScreenState();
}
class _HomePageScreenState extends State<HomePageScreen> {
  @override
  void initState() {
    super.initState();
  }
  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(
      child: Container(
        width: 400,
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          crossAxisAlignment: CrossAxisAlignment.center,
          children: <Widget>[
            Row(
              children: <Widget>[
                Container(
                  width: 200,
                  child: Material( // Ensure TextField has a Material ancestor
                    child: TextField(
                      decoration: InputDecoration(
                        filled: true,
                        fillColor: Colors.white,
                        border: OutlineInputBorder(),
                        labelText: 'Search',
                        hintText: 'Search for a Card',
                      ),
                    ),
                  ),
                ),
                SizedBox(width: 10), // Add some spacing between TextField and ElevatedButton
                ElevatedButton(
                  onPressed: () {
                    // Add functionality for the Search button
                  },
                  style: ButtonStyle(
                    backgroundColor: MaterialStateProperty.all(Colors.brown[50]), // Background color
                    foregroundColor: MaterialStateProperty.all(Colors.black), // Text color
                    padding: MaterialStateProperty.all(EdgeInsets.all(12.0)), // Button padding
                    overlayColor: MaterialStateProperty.all(Colors.grey[100]), // Splash color
                  ),
                  child: Text(
                    'Search',
                    style: TextStyle(fontSize: 14),
                  ),
                ),
              ],
            ),
            Row(
              children: <Widget>[
                Container(
                  width: 200,
                  child: Material( // Ensure TextField has a Material ancestor
                    child: TextField(
                      obscureText: true,
                      decoration: InputDecoration(
                        filled: true,
                        fillColor: Colors.white,
                        border: OutlineInputBorder(),
                        labelText: 'Add',
                        hintText: 'Add a Card',
                      ),
                    ),
                  ),
                ),
                SizedBox(width: 10), // Add some spacing between TextField and ElevatedButton
                ElevatedButton(
                  onPressed: () {
                    // Add functionality for the Add button
                  },
                  style: ButtonStyle(
                    backgroundColor: MaterialStateProperty.all(Colors.brown[50]), // Background color
                    foregroundColor: MaterialStateProperty.all(Colors.black), // Text color
                    padding: MaterialStateProperty.all(EdgeInsets.all(12.0)), // Button padding
                    overlayColor: MaterialStateProperty.all(Colors.grey[100]), // Splash color
                  ),
                  child: Text(
                    'Add',
                    style: TextStyle(fontSize: 14),
                  ),
                ),
              ],
            ),
            Row(
              children: <Widget>[
                ElevatedButton(
                  onPressed: () {
                    MaterialPageRoute(builder: (context) => const LoginPage());
                  },
                  style: ButtonStyle(
                    backgroundColor: MaterialStateProperty.all(Colors.brown[50]), // Background color
                    foregroundColor: MaterialStateProperty.all(Colors.black), // Text color
                    padding: MaterialStateProperty.all(EdgeInsets.all(12.0)), // Button padding
                    overlayColor: MaterialStateProperty.all(Colors.grey[100]), // Splash color
                  ),
                  child: Text(
                    'Logout',
                    style: TextStyle(fontSize: 14),
                  ),
                ),
              ],
            ),
          ],
        ),
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