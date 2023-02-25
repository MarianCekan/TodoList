import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import {IsLoggedGuard} from "src/app/core/guards/is-logged.guard"

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    canActivate: [IsLoggedGuard],
    children: [

    ]

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
