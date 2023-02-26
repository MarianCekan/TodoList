import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../auth/services/auth.service";
import {TodoItem} from "../../../../core/model/todo-item";
import {DataSourceService} from "../../services/data-source.service";
import {BehaviorSubject, map, Observable} from "rxjs";
import {TodoList} from "../../../../core/model/todo-list";
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  dataSource1: MatTableDataSource<TodoList> | undefined;
  itemsListMockapi$ = new BehaviorSubject<TodoList[]>([]);
  displayedColumns;


  constructor(private authService: AuthService, public dataSource: DataSourceService) {
    this.displayedColumns = ['Id', 'Title', 'Content', 'Active', 'Deadline','Edit','Delete']

    // this.itemsList$ = dataSource.getAllItemsLists();
    dataSource.getTodoListsMockapi().subscribe((data) => {
      this.itemsListMockapi$.next(data);
      this.dataSource1 = new MatTableDataSource(data);
    });

  }

  ngOnInit(): void {

  }


  logout() {
    this.authService.signOut();
  }
}
