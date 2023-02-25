import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import {map, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private fireAuth: AngularFireAuth, private router: Router) { }

  //login method
  loginUser(email: string, password: string) {
    this.fireAuth.signInWithEmailAndPassword(email, password).then(() => {
      localStorage.setItem('currentUserToken', 'true')
      this.router.navigate(['dashboard'])
    }, err => {
      alert('Something went wrong: ' + err.message);
      this.router.navigate(['auth/login'])
    })
  }

  //register method
  registerUser(email: string, password: string) {
    this.fireAuth.createUserWithEmailAndPassword(email, password).then(() => {
      alert('user created successfully');
      this.router.navigate(['auth/login'])
    }, err => {
      alert('Something went wrong: ' + err.message);
      this.router.navigate(['auth/register'])
    })
  }

  //logout method
  signOut() {
    this.fireAuth.signOut().then(() => {
      localStorage.removeItem('currentUserToken')
      this.router.navigate(['auth/login'])
    }, err => {
      alert(err.message)
    })
  }

  //reset-password method
  resetPassword(email: string) {
    this.fireAuth.sendPasswordResetEmail(email).then(() => {
      alert('Email for resetting password sent to email: '+email)
      this.router.navigate(['auth/login'])
    }, err => {
      alert(err.message)
    })
  }

  // determine whether user is logged in
  isUserLogged(): Observable<boolean> {
    return this.fireAuth.authState.pipe(map(user => !!user));
  }
}
