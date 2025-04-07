import {Injectable} from '@angular/core';
import {CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';

@Injectable({
  providedIn: 'any'
})
export class AuthGuard implements CanActivate {
  constructor(
    // private authService: AuthService,
    private router: Router
  ) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): any {
    // if (this.authService.isAuthenticated()) {
    //   this.authService.startRefreshTokenTimer();
    //   return true;
    // } else {
    // this.router.navigate(['/login']);
      // return false;
    // }
  }
}
