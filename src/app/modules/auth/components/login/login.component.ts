import { Component, OnInit, OnDestroy } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { Subscription } from "rxjs";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  hidePassword = true;
  errorMessage = "";
  isLoggedIn = false;
  errorMessageSub: Subscription;
  isLoggedInSub: Subscription;

  form: FormGroup = this.fb.group({
    email: ['',[Validators.required]],
    password: ['',[Validators.required]]
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

  get passwordInput() {
    return this.form.get('password')?.value;
  }

  onSubmit(form: FormGroup) {
      if(form.valid){
        this.authService.loginUser(this.emailInput,this.passwordInput)
      }else{
        console.log('nie je spravny formular')
      }
  }
}
