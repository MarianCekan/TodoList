import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MatTableDataSource} from '@angular/material/table';
import {Observable, BehaviorSubject} from 'rxjs';
import {map} from 'rxjs/operators';
import {AuthService} from '../../../auth/services/auth.service';
import {TodoItem} from '../../../../core/model/todo-item';
import {TodoList} from '../../../../core/model/todo-list';
import {DataSourceService} from '../../services/data-source.service';
import {stat} from "fs";
import {MatDialog} from "@angular/material/dialog";
import {CommentComponent} from "../comment/comment.component";
import {AddNewTodoItemComponent} from "../add-new-todo-item/add-new-todo-item.component";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})

export class DashboardComponent implements OnInit {
  displayedColumns;
  items$!: Observable<TodoItem[]>;
  myForm: FormGroup;

  constructor(
    private authService: AuthService,
    private dataSource: DataSourceService,
    private fb: FormBuilder,
    private dialogRef: MatDialog,
  ) {
    this.myForm = fb.group({
      content: ['', []],
      title: ['', []],
      isDone: [false, []],
      deadline: [new Date, []],
    });

    this.displayedColumns = ['Title', 'Content', 'Active', 'Deadline', 'Edit', 'Delete'];
    dataSource.getAllTodos().subscribe(() => {
      this.filterItems(state.ALL, '');
    });
  }

  ngOnInit(): void {
  }

  logout() {
    this.authService.signOut();
  }

  onSubmit(myForm: FormGroup) {
    this.dataSource.addTodo(myForm.value);
    myForm.reset();
  }

  deleteItem(todoItem: TodoItem) {
    this.dataSource.deleteItem(todoItem);
  }

  markDone(todoItem: TodoItem) {
    this.dataSource.markActive(todoItem);
  }

  displayActiveItems() {
    this.filterItems(state.TRUE, '');
  }

  displayAllItems() {
    this.filterItems(state.ALL, '');
  }

  displayInactiveItems() {
    this.filterItems(state.FALSE, '');
  }

  filterItems(value: any, title: string) {
    this.items$ = this.dataSource.getAllTodos().pipe(
      map((items) => {

          if (value === state.ALL) {
            return items
          } else if (value == state.SEARCH) {
            if (title != '') {
              return items.filter((item) => item.title === title)
            } else {
              return items
            }
          } else {
            return items.filter((item) => item.active == value)
          }
        }
      ));
  }

  applySearch(title: string) {
    // this.items$ = this.dataSource.getAllTodosByTitle(title);
    this.filterItems(state.SEARCH, title);
  }

  createNew() {
    let dialogRef = this.dialogRef.open(AddNewTodoItemComponent);
    let instance = dialogRef.componentInstance;
    instance.dialogRef = this.dialogRef;
    // this.dialogRef.open(AddNewTodoItemComponent(this.dialogRef));
    // this.dialogRef.closeAll();

  }
}


enum state {
  FALSE,
  TRUE,
  SEARCH,
  ALL,
}
