import 'dart:async';

import 'package:english_words/english_words.dart';
import 'package:flutter/material.dart';
import 'package:mobile/token.dart';
import 'package:provider/provider.dart';
import 'package:table_calendar/table_calendar.dart';

import 'main.dart';
import 'todo.dart';

List<dynamic> userTodos = [];

class HomePageScreen extends StatelessWidget {
  const HomePageScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return ChangeNotifierProvider(
      create: (context) => HomePageState(),
      child: MaterialApp(
        title: 'Locked In',
        theme: ThemeData(
          useMaterial3: true,
          colorScheme: ColorScheme.fromSeed(seedColor: Colors.deepOrange),
          brightness: Brightness.light,
          fontFamily: 'Poppins',
        ),
        home: HomePage(),
      ),
    );
  }
}

class HomePageState extends ChangeNotifier {
  var current = WordPair.random();

  void getNext() {
    current = WordPair.random();
    notifyListeners();
  }

  var favorites = <WordPair>[];

  void toggleFavorite() {
    if (favorites.contains(current)) {
      favorites.remove(current);
    } else {
      favorites.add(current);
    }
    notifyListeners();
  }
}

class HomePage extends StatefulWidget {
  @override
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  var selectedIndex = 0;

  @override
  Widget build(BuildContext context) {
    Widget page;
    switch (selectedIndex) {
      case 0:
        page = ToDoPage();
        break;
      case 1:
        page = CalendarPage();
        break;
      case 2:
        page = TimerPage();
        break;
      default:
        throw UnimplementedError('no widget for $selectedIndex');
    }

    return LayoutBuilder(
      builder: (context, constraints) {
        return Scaffold(
          appBar: AppBar(
            title: const Padding(
              padding: EdgeInsets.only(top: 8.0),
              child: Text(
                'LockedIn',
                style: TextStyle(
                  color: Colors.black,
                  fontWeight: FontWeight.w900,
                  fontSize: 60,
                  fontFamily: 'Poppins',
                ),
              ),
            ),
            actions: [
              ElevatedButton(
                onPressed: () {
                  Navigator.push(
                    context,
                    MaterialPageRoute(builder: (context) => const LoginPage()),
                  );
                },
                style: ElevatedButton.styleFrom(
                  backgroundColor: Colors.red, // Keep the original red color
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(10),
                  ),
                  padding: const EdgeInsets.symmetric(
                      vertical: 5.0), // Keep the original padding
                ),
                child: const SizedBox(
                  width: 80,
                  child: Text(
                    'Logout',
                    style: TextStyle(
                      color: Colors.white, // Keep the original text color
                      fontSize: 18, // Keep the original font size
                      fontFamily: 'Poppins',
                    ),
                    textAlign: TextAlign.center,
                  ),
                ),
              ),
            ],
          ),
          body: page,
          bottomNavigationBar: BottomNavigationBar(
            items: const [
              BottomNavigationBarItem(
                icon: Icon(Icons.task),
                label: 'To-Do',
              ),
              BottomNavigationBarItem(
                icon: Icon(Icons.calendar_month),
                label: 'Calendar',
              ),
              BottomNavigationBarItem(
                icon: Icon(Icons.timer),
                label: 'Timer',
              ),
            ],
            currentIndex: selectedIndex,
            onTap: (index) {
              setState(() {
                selectedIndex = index;
              });
            },
            selectedItemColor: Colors.red,
            unselectedItemColor: Colors.grey,
          ),
        );
      },
    );
  }
}

class ToDoPage extends StatefulWidget {
  @override
  State<ToDoPage> createState() => _ToDoPageState();
}

class _ToDoPageState extends State<ToDoPage> {
  final todosList = ToDo.todoList();
  List<ToDo> _foundToDo = [];
  final _todoController = TextEditingController();

  @override
  void initState() {
    _foundToDo = todosList;
    super.initState();
    _updateToDoItem();
  }

  @override
  Widget build(BuildContext context) {
    //var appState = context.watch<HomePageState>();
    return Scaffold(
        body: Stack(
      children: [
        Container(
            padding: EdgeInsets.symmetric(horizontal: 15),
            child: Column(
              children: [
                Container(
                    padding: EdgeInsets.only(top: 20), child: searchBox()),
                Expanded(
                  child: ListView(
                    padding: EdgeInsets.only(bottom: MediaQuery.of(context).viewInsets.bottom + 80),
                    children: [
                      Container(
                        margin: const EdgeInsets.only(
                          top: 20,
                          bottom: 20,
                          left: 5,
                        ),
                        child: const Text(
                          "Today's Tasks:",
                          style: TextStyle(
                            fontSize: 25,
                            fontWeight: FontWeight.w800,
                          ),
                        ),
                      ),
                      for (ToDo todo in _foundToDo.reversed)
                        ToDoItem(
                          todo: todo,
                          onToDoChanged: _handleToDoChange,
                          onDeleteItem: _deleteToDoItem,
                          onRenameItem: _renameToDoItem,
                        ),
                    ],
                  ),
                )
              ],
            )),
        Align(
          alignment: Alignment.bottomCenter,
          child: Row(children: [
            Expanded(
              child: Container(
                margin: EdgeInsets.only(
                  bottom: 20,
                  right: 20,
                  left: 20,
                ),
                decoration: BoxDecoration(
                  color: Colors.white,
                  boxShadow: const [
                    BoxShadow(
                      color: Color.fromARGB(255, 161, 50, 111),
                      offset: Offset(0.0, 0.0),
                      blurRadius: 2.0,
                      spreadRadius: 0.0,
                    ),
                  ],
                  borderRadius: BorderRadius.circular(20),
                ),
                child: TextField(
                  controller: _todoController,
                  decoration: InputDecoration(
                      contentPadding: EdgeInsets.only(left: 15),
                      hintText: 'Add a new todo item',
                      border: InputBorder.none),
                ),
              ),
            ),
            Container(
                margin: EdgeInsets.only(bottom: 20, right: 20),
                child: ElevatedButton(
                    onPressed: () {
                      _addToDoItem(_todoController.text);
                    },
                    style: ElevatedButton.styleFrom(
                      backgroundColor: Colors.orange[250],
                      minimumSize: Size(60, 60),
                      elevation: 10,
                    ),
                    child: const Text(
                      '+',
                      style: TextStyle(fontSize: 40),
                    )))
          ]),
        ),
      ],
    ));
  }

  Widget searchBox() {
    return Container(
      padding: EdgeInsets.symmetric(horizontal: 20),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(20),
        boxShadow: const [
          BoxShadow(
            color: Color.fromARGB(255, 161, 50, 111),
            offset: Offset(0.0, 0.0),
            blurRadius: 2.0,
            spreadRadius: 0.0,
          ),
        ],
      ),
      child: TextField(
        onChanged: (value) => _runFilter(value),
        decoration: InputDecoration(
          contentPadding: EdgeInsets.all(0),
          prefixIcon: Icon(
            Icons.search,
            color: Color.fromARGB(255, 107, 104, 104),
            size: 20,
          ),
          prefixIconConstraints: BoxConstraints(maxHeight: 20, minWidth: 25),
          border: InputBorder.none,
          hintText: 'Search',
          hintStyle: TextStyle(color: Colors.grey),
        ),
      ),
    );
  }

  void _handleToDoChange(ToDo todo) {
    setState(() {
      todo.isDone = !todo.isDone;
    });
  }

  void _renameToDoItem(String id, String newText) {
    updateTask(id, newText).then((_) {
      setState(() {
        final index = todosList.indexWhere((item) => item.id == id);
        if (index != -1) {
          todosList[index].todoText = newText;
        }
      });
    }).catchError((error) {
      print('Error renaming ToDo item: $error');
    });
  }

  void _deleteToDoItem(String id) {
    setState(() {
      todosList.removeWhere((item) => item.id == id);
    });

    if (id != '01') {
      try {
        deleteTask(id).then((_) {
          print('Task deleted successfully');
        }).catchError((error) {
          print('$error');
        });
      } catch (error) {
        print('$error');
      }
    }
  }

  Future<void> _updateToDoItem() async {
    try {
      userTodos = await searchTasks("", userId);
      for (var todo in userTodos) {
        setState(() {
          todosList.add(ToDo(
            id: todo['_id'],
            todoText: todo[
                'Task'], // Assuming 'Task' is the text field in your todo object
            isDone: todo[
                'Done'], // Assuming 'Done' indicates whether the task is done or not
          ));
        });
      }
      print('Tasks retrieved successfully');
    } catch (error) {
      print('$error');
    }
  }

  void _addToDoItem(String toDo) {
    try {
      addTask(toDo, "", false, userId).then((taskId) {
        print('Task added successfully');
        setState(() {
          todosList.add(ToDo(
            id: taskId,
            todoText: toDo,
          ));
        });
      }).catchError((error) {
        print('$error');
      });
    } catch (error) {
      print('$error');
    }

    _todoController.clear(); // Clear the text field after adding the item
  }

  void _runFilter(String enteredKeyword) {
    List<ToDo> results = [];
    if (enteredKeyword.isEmpty) {
      results = todosList;
    } else {
      results = todosList
          .where((item) => item.todoText!
              .toLowerCase()
              .contains(enteredKeyword.toLowerCase()))
          .toList();
    }
    setState(() {
      _foundToDo = results;
    });
  }
}

class CalendarPage extends StatefulWidget {
  @override
  State<CalendarPage> createState() => _CalendarPageState();
}

class _CalendarPageState extends State<CalendarPage> {
  late final ValueNotifier<List<Event>> _selectedEvents;
  late final Map<DateTime, List<Event>> _events;
  late final TextEditingController _eventController;
  late final CalendarFormat _calendarFormat;
  late final DateTime _focusedDay;
  late final DateTime _firstDay;
  late final DateTime _lastDay;

  @override
  void initState() {
    super.initState();
    _focusedDay = DateTime.now();
    _firstDay = DateTime.utc(2010, 10, 16);
    _lastDay = DateTime.utc(2030, 3, 14);
    _calendarFormat = CalendarFormat.month;
    _events = {};
    _selectedEvents = ValueNotifier([]);
    _eventController = TextEditingController();
  }

  @override
  void dispose() {
    _eventController.dispose();
    _selectedEvents.dispose();
    super.dispose();
  }

  void _onDaySelected(DateTime selectedDay, DateTime focusedDay) {
    setState(() {
      _selectedEvents.value = _events[selectedDay] ?? [];
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Calendar'),
      ),
      body: SingleChildScrollView(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: <Widget>[
            TableCalendar(
              firstDay: _firstDay,
              lastDay: _lastDay,
              focusedDay: _focusedDay,
              calendarFormat: _calendarFormat,
              onFormatChanged: (format) {
                setState(() {
                  _calendarFormat = format;
                });
              },
              onDaySelected: _onDaySelected,
              eventLoader: _getEventsForDay,
            ),
            SizedBox(height: 20),
            _buildEventList(),
          ],
        ),
      ),
      floatingActionButton: FloatingActionButton(
        child: Icon(Icons.add),
        onPressed: _showAddDialog,
      ),
    );
  }

  List<Event> _getEventsForDay(DateTime day) {
    return _events[day] ?? [];
  }

  Widget _buildEventList() {
    return ValueListenableBuilder<List<Event>>(
      valueListenable: _selectedEvents,
      builder: (context, events, _) {
        return Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: events
              .map((event) => ListTile(
                    title: Text(event.title),
                    trailing: IconButton(
                      icon: Icon(Icons.delete),
                      onPressed: () {
                        setState(() {
                          _events[_focusedDay]!.remove(event);
                          _selectedEvents.value = _events[_focusedDay]!;
                        });
                      },
                    ),
                  ))
              .toList(),
        );
      },
    );
  }

  void _showAddDialog() {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: Text('Add Event'),
        content: TextField(
          controller: _eventController,
          decoration: InputDecoration(labelText: 'Event Title'),
        ),
        actions: <Widget>[
          TextButton(
            onPressed: () {
              Navigator.pop(context);
            },
            child: Text('Cancel'),
          ),
          TextButton(
            onPressed: () {
              setState(() {
                final newEvent = Event(title: _eventController.text);
                if (_events[_focusedDay] != null) {
                  _events[_focusedDay]!.add(newEvent);
                } else {
                  _events[_focusedDay] = [newEvent];
                }
                _selectedEvents.value = _events[_focusedDay]!;
                _eventController.clear();
                Navigator.pop(context);
              });
            },
            child: Text('Save'),
          ),
        ],
      ),
    );
  }
}

class Event {
  final String title;
  Event({required this.title});
}

class TimerPage extends StatefulWidget {
  @override
  State<TimerPage> createState() => _TimerPageState();
}

class _TimerPageState extends State<TimerPage> {
  late Timer _timer;
  int _minutes = 0;
  int _seconds = 0;
  int _start = 0;
  bool _isPaused = false;
  TextEditingController _minutesController = TextEditingController();
  TextEditingController _secondsController = TextEditingController();

  void startTimer() {
    _start = _minutes * 60 + _seconds;
    if (_start <= 0) return; // Validate input
    const oneSec = Duration(seconds: 1);
    _timer = Timer.periodic(
      oneSec,
      (timer) {
        if (_isPaused) return;
        setState(() {
          if (_start < 1) {
            timer.cancel();
            // Timer completed, you can handle it here
          } else {
            _start--;
            _minutes = _start ~/ 60; // Update minutes
            _seconds = _start % 60; // Update seconds
          }
        });
      },
    );
  }

  void pauseTimer() {
    if (_isPaused) {
      setState(() {
        _isPaused = false;
      });
    } else {
      setState(() {
        _isPaused = true;
      });
    }
  }

  void resetTimer() {
    setState(() {
      _timer.cancel();
      _start = 0;
      _minutes = 0;
      _seconds = 0;
      _minutesController.clear(); // Clear minutes text field
      _secondsController.clear(); // Clear seconds text field
      _isPaused = false;
    });
  }

  @override
  void dispose() {
    _timer.cancel();
    _minutesController.dispose(); // Dispose the minutes controller
    _secondsController.dispose(); // Dispose the seconds controller
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Timer'),
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: <Widget>[
                SizedBox(
                  width: 80,
                  child: TextField(
                    controller: _minutesController,
                    keyboardType: TextInputType.number,
                    decoration: InputDecoration(
                      labelText: 'Min',
                    ),
                    onChanged: (value) {
                      setState(() {
                        _minutes = int.tryParse(value) ?? 0; // Parse minutes
                      });
                    },
                  ),
                ),
                SizedBox(width: 20),
                SizedBox(
                  width: 80,
                  child: TextField(
                    controller: _secondsController,
                    keyboardType: TextInputType.number,
                    decoration: InputDecoration(
                      labelText: 'Sec',
                    ),
                    onChanged: (value) {
                      setState(() {
                        _seconds = int.tryParse(value) ?? 0; // Parse seconds
                      });
                    },
                  ),
                ),
              ],
            ),
            SizedBox(height: 20),
            Text(
              '$_minutes:${_seconds.toString().padLeft(2, '0')}',
              style: TextStyle(fontSize: 48),
            ),
            SizedBox(height: 20),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceEvenly,
              children: <Widget>[
                ElevatedButton(
                  onPressed: startTimer,
                  child: Text('Start'),
                ),
                ElevatedButton(
                  onPressed: pauseTimer,
                  child: Text('Pause/Resume'),
                ),
                ElevatedButton(
                  onPressed: resetTimer,
                  child: Text('Reset'),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }
}

class AlarmPage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    var appState = context.watch<HomePageState>();
    var pair = appState.current;

    IconData icon;
    if (appState.favorites.contains(pair)) {
      icon = Icons.favorite;
    } else {
      icon = Icons.favorite_border;
    }

    return Center(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          BigCard(pair: pair),
          SizedBox(height: 10),
          Row(
            mainAxisSize: MainAxisSize.min,
            children: [
              ElevatedButton.icon(
                onPressed: () {
                  appState.toggleFavorite();
                },
                icon: Icon(icon),
                label: Text('Like'),
              ),
              SizedBox(width: 10),
              ElevatedButton(
                onPressed: () {
                  appState.getNext();
                },
                child: Text('Next'),
              ),
            ],
          ),
        ],
      ),
    );
  }
}

class BigCard extends StatelessWidget {
  const BigCard({
    super.key,
    required this.pair,
  });

  final WordPair pair;

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final style = theme.textTheme.displayMedium!.copyWith(
      color: theme.colorScheme.onPrimary,
    );

    return Card(
      color: theme.colorScheme.primary,
      child: Padding(
          padding: const EdgeInsets.all(20.0),
          child: Text(
            pair.asLowerCase,
            style: style,
            semanticsLabel: "${pair.first} ${pair.second}",
          )),
    );
  }
}

class ToDoItem extends StatelessWidget {
  final ToDo todo;
  final onToDoChanged;
  final onDeleteItem;
  final onRenameItem;

  const ToDoItem(
      {Key? key,
      required this.todo,
      required this.onToDoChanged,
      required this.onDeleteItem,
      required this.onRenameItem})
      : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: EdgeInsets.only(bottom: 15),
      child: ListTile(
        onTap: () {
          print('Clicked on ToDo item.');
          onToDoChanged(todo);
        },
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(20),
        ),
        contentPadding: EdgeInsets.symmetric(horizontal: 20, vertical: 5),
        tileColor: const Color.fromARGB(255, 163, 52, 18),
        leading: Icon(
          todo.isDone ? Icons.check_box : Icons.check_box_outline_blank,
          color: Colors.white,
        ),
        title: Text(
          todo.todoText!,
          style: TextStyle(
            fontSize: 16,
            fontWeight: FontWeight.bold,
            color: Colors.white,
            decoration: todo.isDone ? TextDecoration.lineThrough : null,
          ),
        ),
        trailing: Row(
          mainAxisSize: MainAxisSize.min,
          children: [
            Container(
              padding: EdgeInsets.all(0),
              margin: EdgeInsets.symmetric(vertical: 12),
              height: 35,
              width: 35,
              decoration: BoxDecoration(
                color: Colors.white,
                borderRadius: BorderRadius.circular(5),
              ),
              child: IconButton(
                color: Color.fromARGB(255, 169, 169, 169),
                iconSize: 22,
                icon: Icon(
                  Icons.edit_outlined,
                  color: const Color.fromARGB(255, 94, 94, 94),
                ),
                onPressed: () {
                  print('Pressed Edit button');
                  showDialog(
                    context: context,
                    builder: (context) {
                      TextEditingController controller =
                          TextEditingController(text: todo.todoText);
                      return AlertDialog(
                        content: TextField(
                          controller: controller,
                        ),
                        actions: [
                          TextButton(
                            child: Text('Rename'),
                            onPressed: () {
                              String enteredText = controller.text;
                              onRenameItem(todo.id, enteredText);
                              Navigator.pop(context); // Close the dialog
                            },
                          ),
                        ],
                      );
                    },
                  );
                },
              ),
            ),
            Container(
              padding: EdgeInsets.all(0),
              margin: EdgeInsets.symmetric(vertical: 12),
              height: 35,
              width: 35,
              decoration: BoxDecoration(
                color: Colors.red,
                borderRadius: BorderRadius.circular(5),
              ),
              child: IconButton(
                color: Colors.white,
                iconSize: 18,
                icon: Icon(Icons.delete),
                onPressed: () {
                  print('Pressed Delete button');
                  onDeleteItem(todo.id);
                },
              ),
            ),
          ],
        ),
      ),
    );
  }
}
