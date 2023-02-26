import {Timestamp} from "rxjs";

export interface TodoItem {
  id: string,
  title: string,
  content: string,
  deadline: any;
  active: boolean;
  todoListId: string;
}
