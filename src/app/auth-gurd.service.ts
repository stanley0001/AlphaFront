import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
@Injectable({
  providedIn: 'root'
})
export class AuthGurdService implements CanActivate{

  constructor(public auth: AuthService, public router: Router) {}  canActivate(): boolean {
    if (!this.auth.isUserLoggedIn()) {
      this.router.navigate(['auth']);
      return false;
    }
    return true;
  }


}
