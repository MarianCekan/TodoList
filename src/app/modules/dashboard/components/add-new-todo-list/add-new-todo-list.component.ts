import {Component, Input, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../auth/services/auth.service";
import {DataSourceService} from "../../services/data-source.service";

@Component({
  selector: 'app-add-new-todo-list',
  templateUrl: './add-new-todo-list.component.html',
  styleUrls: ['./add-new-todo-list.component.scss']
})
export class AddNewTodoListComponent implements OnInit {
  @Input() dialogRef: MatDialog | undefined;
  myForm: FormGroup;

  constructor(
    private authService: AuthService,
    private dataSource: DataSourceService,
    private fb: FormBuilder,
  ) {

    this.myForm = fb.group({
      Name: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
  }

  onSubmit(myForm: FormGroup) {
    if (myForm.valid) {
      this.dataSource.addTodoList(myForm.value);
      myForm.reset();
      this.dialogRef?.closeAll();
    }
  }

}
