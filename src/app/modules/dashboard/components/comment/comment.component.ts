import {Component, Input, OnInit} from '@angular/core';
import {TodoItem} from "../../../../core/model/todo-item";
import {DataSourceService} from "../../services/data-source.service";

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {
  @Input() todoItem!: TodoItem;

  constructor(private dataSource: DataSourceService) {

  }

  ngOnInit(): void {
  }

  onDelete(todoItem: TodoItem) {
    this.dataSource.deleteItem(todoItem);
  }

  onDone(todoItem: TodoItem) {
  }
}
