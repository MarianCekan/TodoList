import {Injectable} from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {TodoItem} from "../../../core/model/todo-item";
import {TodoList} from "../../../core/model/todo-list";
import {map, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class DataSourceService {

  constructor(private afs: AngularFirestore, private http: HttpClient) {
  }

  getTodoListsMockapi(): Observable<TodoList[]>{
   return this.http.get<TodoList[]>('https://63fb25602027a45d8d60ca40.mockapi.io/TodoList')
  }

  // add item do DB
  addItem(item: TodoItem) {
    this.afs.createId();
    return this.afs.collection('/Item').add(item);
  }

  // get all items from DB
  getAllItems(): Observable<TodoItem[]> {
    return this.afs.collection('/Item').snapshotChanges()
      .pipe(
        map(actions => actions.map(action => {
          const data = action.payload.doc.data() as TodoItem;
          const itemId = action.payload.doc.id;
          return { itemId, ...data };
        }))
      );
  }

  // get all items from DB
  getItemByListId(id:string): Observable<TodoItem> {
    return this.http.get<TodoItem>('https://63fb25602027a45d8d60ca40.mockapi.io/TodoItem/'+id)

  }

  // delete item from DB
  deleteItem(item: TodoItem) {
    this.afs.createId();
    return this.afs.doc('/Item/' + item.id).delete();
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

          return data ;
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
