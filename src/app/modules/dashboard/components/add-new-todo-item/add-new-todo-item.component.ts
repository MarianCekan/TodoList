import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {AuthService} from "../../../auth/services/auth.service";
import {DataSourceService} from "../../services/data-source.service";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-add-new-todo-item',
  templateUrl: './add-new-todo-item.component.html',
  styleUrls: ['./add-new-todo-item.component.scss']
})
export class AddNewTodoItemComponent implements OnInit {
  @Input() dialogRef: MatDialog | undefined;
  myForm: FormGroup;

  constructor(
    private authService: AuthService,
    private dataSource: DataSourceService,
    private fb: FormBuilder,
  ) {
    this.myForm = fb.group({
      content: ['', []],
      title: ['', []],
      isDone: [true, []],
      deadline: [new Date, []],
    });
  }

  ngOnInit(): void {
  }

  onSubmit(myForm: FormGroup) {
    this.dataSource.addTodo(myForm.value);
    myForm.reset();
    this.dialogRef?.closeAll();
  }
}
