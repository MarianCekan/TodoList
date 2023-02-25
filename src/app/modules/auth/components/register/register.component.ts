import { Component, OnInit } from '@angular/core';
import {Subscription} from "rxjs";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
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
      this.authService.registerUser(this.emailInput,this.passwordInput)
    }else{
      console.log('nie je spravny formular')
    }
  }
}
