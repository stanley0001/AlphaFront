import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from './auth.service';
@Injectable({
  providedIn: 'root'
})
export class LoggedInGuardService implements CanActivate{

  constructor(public auth: AuthService, public router: Router) {}  canActivate(): boolean {
    if (this.auth.isUserLoggedIn()) {
      this.router.navigate(['admin/dash']);
      return false;
    }
    return true;
  }


}