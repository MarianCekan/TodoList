import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/compat/firestore";
import {TodoItem} from "../../../core/model/todo-item";
import {TodoList} from "../../../core/model/todo-list";
import {map, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {arrayRemove, arrayUnion} from "@angular/fire/firestore";

@Injectable({
  providedIn: 'root'
})
export class DataSourceService {

  firestoreCollection: AngularFirestoreCollection;

  constructor(private afs: AngularFirestore, private http: HttpClient) {
    this.firestoreCollection = afs.collection('todos')
  }

  addTodoList(todoList: TodoList) {
    let id = this.afs.createId();
    this.afs.collection('ItemList').doc(id).set({
      Name: todoList.Name,
      Items: arrayUnion(),
      ItemListId: id
    })
  }

  addTodo(todoItem: TodoItem) {
    this.firestoreCollection.add({
      title: todoItem.title,
      active: true,
      deadline: todoItem.deadline,
      content: todoItem.content
    })
  }

  updateTodo(todoItem: TodoItem) {
    this.deleteTodo(todoItem);
    todoItem.active = !todoItem.active
    this.afs.collection('ItemList').doc(todoItem.TodoListId).update({
      Items: arrayUnion(todoItem)
    })
  }

  addTodoItem(todoItem: TodoItem) {
    this.afs.collection('ItemList').doc(todoItem.TodoListId).update({
      Items: arrayUnion(todoItem)
    })
  }

  deleteTodo(todoItem: TodoItem) {
    this.afs.collection('ItemList').doc(todoItem.TodoListId).update({
      Items: arrayRemove(todoItem)
    })
  }
  deleteTodoList(TodoList: TodoList) {
    this.afs.collection('ItemList').doc(TodoList.ItemListId).delete()
  }
  getAllTodos(): Observable<TodoItem[]> {
    return this.afs.collection('/todos').snapshotChanges()
      .pipe(
        map(actions => actions.map(action => {
          const data = action.payload.doc.data() as TodoItem;
          data.id = action.payload.doc.id
          return data;
        }))
      );
  }

  getAllTodosByTitle(title: string): Observable<TodoItem[]> {
    return this.afs.collection('/todos', ref => ref.where("title", "==", title)).snapshotChanges()
      .pipe(
        map(actions => actions.map(action => {
          const data = action.payload.doc.data() as TodoItem;
          data.id = action.payload.doc.id
          return data;
        }))
      );
  }

  // delete item from DB
  deleteItem(item: TodoItem) {
    return this.afs.doc('/todos/' + item.id).delete();
  }

  // get all items from DB
  getAllItemsLists(): Observable<TodoList[]> {
    return this.afs.collection('/ItemList').snapshotChanges()
      .pipe(
        map(actions => actions.map(action => {
          const data = action.payload.doc.data() as TodoList;

          return data;
        }))
      );
  }
}
