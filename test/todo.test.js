/* eslint-disable max-lines-per-function */
const { ToDo, ToDoList } = require('../lib/ToDo.js');

describe('TodoList', () => {
  let todo1;
  let todo2;
  let todo3;
  let list;

  beforeEach(() => {
    todo1 = new ToDo('Buy milk');
    todo2 = new ToDo('Clean room');
    todo3 = new ToDo('Go to the gym');

    list = new ToDoList("Today's Todos");
    list.addToDo(todo1);
    list.addToDo(todo2);
    list.addToDo(todo3);
  });

  // your tests go here
  test('ToDoList has a size of 3', () => {
    expect(list.size()).toBe(3);
  });

  test('ToDoList.prototype.toArray returns an array', () => {
    expect(list.toArray()).toEqual([todo1, todo2, todo3]);
  });

  test('ToDoList.prototype.first returns first ToDo in list', () => {
    expect(list.first()).toEqual(todo1);
  });

  test('ToDoList.prototype.last returns last ToDo in list', () => {
    expect(list.last()).toEqual(todo3);
  });

  test('ToDoList.prototype.shift removes and returns first element in list', () => {
    let shiftedElement = list.shift();
    expect(shiftedElement).toEqual(todo1);
    expect(list.toArray()).toEqual([todo2, todo3]);
  });

  test('ToDoList.prototype.pop removes and returns last element in list', () => {
    let poppedElement = list.pop();
    expect(poppedElement).toEqual(todo3);
    expect(list.toArray()).toEqual([todo1, todo2]);
  });

  test('ToDoList.prototype.isDone should return true when all elements are marked done', () => {
    for (let count = 1; count < 4; count++) {
      list.markDoneAt(count);
      if (count < 3) {
        expect(list.isDone()).toBe(false);
      } else {
        expect(list.isDone()).toBe(true);
      }
    }
  });

  test('ToDoList.prototype.addToDo throws TypeError when given non-ToDo object', () => {
    expect(() => list.addToDo(null)).toThrow(TypeError);
  });

  test('ToDoList.prototype.itemAt throws ReferenceError for invalid index', () => {
    expect(() => list.itemAt(10000)).toThrow(ReferenceError);
  });

  test('ToDoList.prototype.markDoneAt throws ReferenceError for invalid index', () => {
    expect(() => list.markDoneAt(10000)).toThrow(ReferenceError);
  });

  test('ToDoList.prototype.markNotDoneAt throws ReferenceError for invalid index', () => {
    expect(() => list.markNotDoneAt(10000)).toThrow(ReferenceError);
  });

  test('ToDoList.prototype.markAllDone marks every ToDo as complete', () => {
    expect(list.isDone()).toBe(false);
    list.markAllDone();
    expect(list.isDone()).toBe(true);
  });

  test('ToDoList.prototype.removeAt removes and returns an item from a specified index; throws ReferenceError otherwise', () => {
    let removedElement = list.removeAt(3);
    expect(removedElement).toEqual(todo3);
    expect(list.toArray()).toEqual([todo1, todo2]);
    expect(() => list.removeAt(4)).toThrow(ReferenceError);
  });

  test('ToDoList.prototype.forEach iterates over each item', () => {
    let items = [todo1, todo2, todo3];
    let iterrated = [];
    list.forEach(item => iterrated.push(item));
    expect(items).toEqual(iterrated);
  });

  test('ToDoList.prototype.filter appropriately selects items based on callback', () => {
    let filtered = list.filter((todo) => todo.getTitle().split(' ').length === 2);
    list.removeAt(3);
    list.title = "Filtered List";
    expect(list).toEqual(filtered);
  });
});