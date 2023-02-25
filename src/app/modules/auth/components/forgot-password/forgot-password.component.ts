import { Component, OnInit } from '@angular/core';
import {Subscription} from "rxjs";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  hidePassword = true;
  errorMessage = "";
  errorMessageSub: Subscription;
  isLoggedInSub: Subscription;

  form: FormGroup = this.fb.group({
    email: ['',[Validators.required]],
  })

  constructor(private authService: AuthService, private fb: FormBuilder) {
    this.errorMessageSub = new Subscription();
    this.isLoggedInSub = new Subscription();
  }

  ngOnInit(): void {

  }

  ngOnDestroy() {
    this.errorMessageSub.unsubscribe();
    this.isLoggedInSub.unsubscribe();
  }


  get emailInput() {
    return this.form.get('email')?.value;
  }

  onSubmit(form: FormGroup) {
    if(form.valid){
      this.authService.resetPassword(this.emailInput)
    }
  }
}
