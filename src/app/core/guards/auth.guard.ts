// TODO: Not sure if combining 2 or more guards (is-logged, is-signed-out) is correct approach
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../../modules/auth/services/auth.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.authService.isUserLogged().pipe(
      map(isLogged => {
        if ((state.url === '/auth/login' || state.url === '/auth/register' || state.url === '/auth/forgot-password') && isLogged) {
          this.router.navigate(['/dashboard']);
          return false;
        } else if (state.url !== '/auth/login' && !isLogged) {
          this.router.navigate(['/auth/login']);
          return false;
        } else {
          return true;
        }
      })
    );
  }
}
