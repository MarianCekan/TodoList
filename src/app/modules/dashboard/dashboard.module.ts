import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import {MaterialModule} from "../../core/modules/material/material.module";
import { CommentComponent } from './components/comment/comment.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    DashboardComponent,
    CommentComponent,
  ],
  exports: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MaterialModule,
    FormsModule
  ],
})
export class DashboardModule { }
