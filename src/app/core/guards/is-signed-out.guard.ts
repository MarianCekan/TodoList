import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {map, Observable, tap} from 'rxjs';
import {AuthService} from "../../modules/auth/services/auth.service";

@Injectable({
  providedIn: 'root'
})
export class IsSignedOutGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.authService.isUserLogged().pipe(
      map(isLogged => {
        if (isLogged) {
          this.router.navigate(['/dashboard']);
        }
        return !isLogged;
      })
    );
  }


}
