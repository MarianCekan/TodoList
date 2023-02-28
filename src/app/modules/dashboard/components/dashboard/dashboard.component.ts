import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {AuthService} from '../../../auth/services/auth.service';
import {TodoItem} from '../../../../core/model/todo-item';
import {TodoList} from '../../../../core/model/todo-list';
import {DataSourceService} from '../../services/data-source.service';
import {MatDialog} from "@angular/material/dialog";
import {AddNewTodoItemComponent} from "../add-new-todo-item/add-new-todo-item.component";
import {AddNewTodoListComponent} from "../add-new-todo-list/add-new-todo-list.component";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})

export class DashboardComponent implements OnInit {
  itemsList$!: Observable<TodoList[]>;
  displayedColumns;
  attendance = 1619162740557;


  constructor(private authService: AuthService, private dataSource: DataSourceService, private fb: FormBuilder, private dialogRef: MatDialog,) {
    this.displayedColumns = ['Title', 'Content', 'Deadline', 'Edit', 'Delete'];

    this.dataSource.getAllItemsLists().subscribe(() => {
      this.filterItems2('', '', undefined)
    });
  }

  ngOnInit() {
  }

  ngOnDestroy() {
  }

  createTodoList() {
    let dialogRef = this.dialogRef.open(AddNewTodoListComponent);
    let instance = dialogRef.componentInstance;
    instance.dialogRef = this.dialogRef;
  }

  deleteTodoList(TodoList: TodoList) {
    this.dataSource.deleteTodoList(TodoList)
  }

  onSubmit(myForm: FormGroup) {
    this.dataSource.addTodo(myForm.value);
    myForm.reset();
  }

  changeState(todoItem: TodoItem) {
    this.dataSource.updateTodo(todoItem)
  }

  showActive(todoListId: string) {
    this.filterItems2(todoListId, '', true);
  }

  showInactive(todoListId: string) {
    this.filterItems2(todoListId, '', false);
  }

  showAll(todoListId: string) {
    this.filterItems2(todoListId, '', undefined);
  }

  applySearch(todoListId: string, value: string) {
    this.filterItems2(todoListId, value, undefined);
  }

  createTodo(TodoListId: string) {
    let dialogRef = this.dialogRef.open(AddNewTodoItemComponent)
    let instance = dialogRef.componentInstance;
    instance.dialogRef = this.dialogRef;
    instance.TodoListId = TodoListId;
  }

  deleteItem(todoItem: TodoItem) {
    this.dataSource.deleteTodo(todoItem);
  }

  filterItems2(todoListId: string, search: string, active?: boolean) {
    this.itemsList$ = this.dataSource.getAllItemsLists().pipe(
      map(todoLists => {
        // Find the TodoList that matches the given ID
        const matchingList = todoLists.find(list => list.ItemListId === todoListId);

        if (!matchingList) {
          // If no TodoList with the given ID is found, return the original array
          return todoLists;
        }

        // If active is undefined, return the unfiltered TodoList
        if (active === undefined && search == '') {
          return todoLists;
        }
        // Clone the matching TodoList object and filter its items based on the given active parameter
        const filteredItems = matchingList.Items.filter(item => search ? item.title === search : item.active === active);
        const filteredList = {
          ...matchingList,
          Items: filteredItems
        };

        // Replace the matching TodoList object with the filtered TodoList object in the array
        const filteredLists = todoLists.map(list => {
          if (list.ItemListId === todoListId) {
            return filteredList;
          } else {
            return list;
          }
        });
        return filteredLists;
      })
    );
  }
}
