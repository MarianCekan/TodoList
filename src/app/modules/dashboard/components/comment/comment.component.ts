import {Component, Input, OnInit} from '@angular/core';
import {TodoItem} from "../../../../core/model/todo-item";

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {
  @Input() todoItem!: TodoItem;

  constructor() {

  }

  ngOnInit(): void {
  }

  onUpdate(todoItem: TodoItem) {
    alert(todoItem.title + ' - '+todoItem.id)
  }

  onDelete() {

  }
}
