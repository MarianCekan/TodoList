import {TodoItem} from "./todo-item";

export interface TodoList {
  ItemListId: string,
  Name: string,
  Items: TodoItem[]
}
