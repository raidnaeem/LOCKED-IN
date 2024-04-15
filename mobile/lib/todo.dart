class ToDo {
  String? id;
  String? todoText;
  bool isDone;

  ToDo({
    required this.id,
    required this.todoText,
    this.isDone = false,
  });

  static List<ToDo> todoList() {
    return [
      ToDo(id: '01', todoText: 'Calc homework', isDone: true),
      ToDo(id: '02', todoText: 'Dinner', isDone: true),
      ToDo(id: '03', todoText: 'Groceries', ),
      ToDo(id: '04', todoText: 'Check mail', ),
      ToDo(id: '05', todoText: 'Gym', isDone: true),
    ];
  }
}