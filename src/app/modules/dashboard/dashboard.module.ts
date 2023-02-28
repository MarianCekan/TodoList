import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import {MaterialModule} from "../../core/modules/material/material.module";
import { CommentComponent } from './components/comment/comment.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AddNewTodoItemComponent } from './components/add-new-todo-item/add-new-todo-item.component';
import {ToolbarComponent} from "./components/toolbar/toolbar.component";
import { AddNewTodoListComponent } from './components/add-new-todo-list/add-new-todo-list.component';
import {MatDatetimepickerModule} from "@mat-datetimepicker/core";


@NgModule({
  declarations: [
    DashboardComponent,
    CommentComponent,
    AddNewTodoItemComponent,
    ToolbarComponent,
    AddNewTodoListComponent,
  ],
  exports: [
    DashboardComponent,
    ToolbarComponent
  ],
    imports: [
        CommonModule,
        DashboardRoutingModule,
        MaterialModule,
        FormsModule,
        ReactiveFormsModule,
        MatDatetimepickerModule
    ],
})
export class DashboardModule { }
