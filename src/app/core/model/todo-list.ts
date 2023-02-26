import {TodoItem} from "./todo-item";

export interface TodoList {
  id: string,
  name: string,
  items: TodoItem[]
}
