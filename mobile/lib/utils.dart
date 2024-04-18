import 'dart:collection';

import 'package:table_calendar/table_calendar.dart';

class Event {
  final String title;

  const Event(this.title);

  @override
  String toString() => title;
}

final Events = LinkedHashMap<DateTime, List<Event>>(
  equals: isSameDay,
  hashCode: getHashCode,
)..addAll(_EventSource);

final _EventSource = {
  for (var i = 0; i < 50; i++)
    DateTime.utc(FirstDay.year, FirstDay.month, i * 5): [
      for (var j = 0; j < i % 4 + 1; j++)
        Event('Event $i | ${j + 1}')
    ],
  Today: [
    Event("Today's Event 1"),
    Event("Today's Event 2"),
  ]
};

int getHashCode(DateTime key) {
  return key.day * 1000000 + key.month * 10000 + key.year;
}

/// Returns a list of [DateTime] objects from [first] to [last], inclusive.
List<DateTime> daysInRange(DateTime first, DateTime last) {
  final dayCount = last.difference(first).inDays + 1;
  return List.generate(
    dayCount,
    (index) => DateTime.utc(first.year, first.month, first.day + index),
  );
}

final Today = DateTime.now();
final FirstDay = DateTime(Today.year, Today.month - 3, Today.day);
final LastDay = DateTime(Today.year, Today.month + 8, Today.day);