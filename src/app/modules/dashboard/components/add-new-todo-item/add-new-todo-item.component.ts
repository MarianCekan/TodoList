import {Component, Input, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
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
  @Input() TodoListId: string = '';
  myForm: FormGroup;

  constructor(
    private authService: AuthService,
    private dataSource: DataSourceService,
    private fb: FormBuilder,
  ) {
    this.myForm = fb.group({
      content: ['', []],
      title: ['', [Validators.required]],
      active: [true, []],
      deadline: [new Date, [futureDateValidator]],
      TodoListId: ['', []]
    });
  }

  ngOnInit(): void {
    // Pretoze v konstruktor sa vykonna skor
    this.myForm.controls['TodoListId'].setValue(this.TodoListId);
  }

  onSubmit(myForm: FormGroup) {
    if (myForm.valid) {
      this.dataSource.addTodoItem(myForm.value);
      myForm.reset();
      this.dialogRef?.closeAll();
    }
  }

}

function futureDateValidator(control: AbstractControl): { [key: string]: any } | null {
  const deadlineDate = new Date(control.value);
  const now = new Date();

  if (deadlineDate.getTime() <= now.getTime()) {
    return {'futureDate': true};
  }

  return null;
}
