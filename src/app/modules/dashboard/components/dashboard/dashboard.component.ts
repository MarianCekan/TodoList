import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MatTableDataSource} from '@angular/material/table';
import {Observable, BehaviorSubject} from 'rxjs';
import {map} from 'rxjs/operators';
import {AuthService} from '../../../auth/services/auth.service';
import {TodoItem} from '../../../../core/model/todo-item';
import {TodoList} from '../../../../core/model/todo-list';
import {DataSourceService} from '../../services/data-source.service';

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
    private fb: FormBuilder
  ) {
    this.myForm = fb.group({
      content: ['', []],
      title: ['', []],
      isDone: [false, []],
      deadline: [new Date, []],
    });

    this.displayedColumns = ['Title', 'Content', 'Active', 'Deadline', 'Edit', 'Delete'];
    dataSource.getAllTodos().subscribe(() => {
      this.filterItems(undefined,'');
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
    this.filterItems(true,'');
  }

  displayAllItems() {
    this.filterItems(undefined,'');
  }

  displayInactiveItems() {
    this.filterItems(false,'');
  }

  filterItems(value: any,title: string) {
    this.items$ = this.dataSource.getAllTodos().pipe(
      map((items) =>{

        if(value === undefined){
          return items
        }else if(value == 'jano'){
          return items.filter((item) => item.title === title)
        }else{
          return items.filter((item) => item.active === value)
        }}
    ));
  }

  applySearch(title: string) {
    // this.items$ = this.dataSource.getAllTodosByTitle(title);
    //TODO: pridat enum na to nie jano
    this.filterItems('jano',title);
  }
}

