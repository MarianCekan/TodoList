import {Injectable} from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {TodoItem} from "../../../core/models/todo-item";
import {TodoList} from "../../../core/models/todo-list";
import {map, Observable} from "rxjs";
import {arrayRemove, arrayUnion} from "@angular/fire/firestore";

@Injectable({
  providedIn: 'root'
})
export class DataSourceService {


  constructor(private afs: AngularFirestore) {
  }

  // add new todoList to DB
  addTodoList(todoList: TodoList) {
    let id = this.afs.createId();
    this.afs.collection('ItemList').doc(id).set({
      Name: todoList.Name,
      Items: arrayUnion(),
      ItemListId: id
    })
  }

  // update todoItem in DB
  updateTodoItem(todoItem: TodoItem) {
    this.deleteTodoItem(todoItem);
    todoItem.active = !todoItem.active
    this.afs.collection('ItemList').doc(todoItem.TodoListId).update({
      Items: arrayUnion(todoItem)
    })
  }

  // add todoItem to DB
  addTodoItem(todoItem: TodoItem) {
    this.afs.collection('ItemList').doc(todoItem.TodoListId).update({
      Items: arrayUnion(todoItem)
    })
  }

  // delete todoItem from DB
  deleteTodoItem(todoItem: TodoItem) {
    this.afs.collection('ItemList').doc(todoItem.TodoListId).update({
      Items: arrayRemove(todoItem)
    })
  }

  // delete todoList from DB
  deleteTodoList(TodoList: TodoList) {
    this.afs.collection('ItemList').doc(TodoList.ItemListId).delete()
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
