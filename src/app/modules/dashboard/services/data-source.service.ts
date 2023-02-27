import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/compat/firestore";
import {TodoItem} from "../../../core/model/todo-item";
import {TodoList} from "../../../core/model/todo-list";
import {map, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class DataSourceService {

  firestoreCollection: AngularFirestoreCollection;

  constructor(private afs: AngularFirestore, private http: HttpClient) {
    this.firestoreCollection = afs.collection('todos')
  }

  addTodo(todoItem: TodoItem) {
    this.firestoreCollection.add({
      title: todoItem.title,
      active: true,
      deadline: todoItem.deadline,
      content: todoItem.content
    })
  }

  getAllTodos(): Observable<TodoItem[]>{
    return this.afs.collection('/todos').snapshotChanges()
      .pipe(
        map(actions => actions.map(action => {
          const data = action.payload.doc.data() as TodoItem;
          data.id = action.payload.doc.id
          return data;
        }))
      );
  }

  getAllTodosByTitle(title: string): Observable<TodoItem[]>{
    return this.afs.collection('/todos',ref=>ref.where("title","==",title)).snapshotChanges()
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

  markActive(item: TodoItem){
    this.afs.collection('/todos').doc(item.id).update({active: !item.active})
  }

  getTodoListsMockapi(): Observable<TodoList[]> {
    return this.http.get<TodoList[]>('https://63fb25602027a45d8d60ca40.mockapi.io/TodoList')
  }

  // // add item do DB
  // addItem(item: TodoItem) {
  //   this.afs.createId();
  //   return this.afs.collection('/Item').add(item);
  // }

  // // add item do DB
  addItem(item: TodoItem) {
    fetch('https://63fb25602027a45d8d60ca40.mockapi.io/TodoList/' + item.TodoListId + '/TodoItem', {
      method: 'POST',
      headers: {'content-type': 'application/json'},
      // Send your data in the request body as JSON
      body: JSON.stringify(item)
      //@ts-ignore
    }).then(res => {
      if (res.ok) {
        return res.json();
      }
      // handle error
    }).then(task => {
      // do something with the new task
    }).catch(error => {
      // handle error
    })
  }

  // get all items from DB
  getAllItems(): Observable<TodoItem[]> {
    return this.afs.collection('/Item').snapshotChanges()
      .pipe(
        map(actions => actions.map(action => {
          const data = action.payload.doc.data() as TodoItem;
          const itemId = action.payload.doc.id;
          return {itemId, ...data};
        }))
      );
  }

  // get all items from DB
  getItemByListId(id: string): Observable<TodoItem> {
    return this.http.get<TodoItem>('https://63fb25602027a45d8d60ca40.mockapi.io/TodoItem/' + id)

  }


  // update item from DB TODO: implement it so it will actually update not delete and insert
  updateItem(item: TodoItem) {
    this.deleteItem(item).then(() => {
        this.addItem(item);
      }
    );
  }

  // add item do DB
  addItemList(itemList: TodoList) {
    this.afs.createId();
    return this.afs.collection('/ItemList').add(itemList);
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

  // delete item from DB
  deleteItemList(itemList: TodoList) {
    this.afs.createId();
    return this.afs.doc('/ItemList/' + itemList.id).delete();
  }

  // update item from DB TODO: implement it so it will actually update not delete and insert
  updateItemList(itemList: TodoList) {
    this.deleteItemList(itemList).then(() => {
        this.addItemList(itemList);
      }
    );
  }
}
