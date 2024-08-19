import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from './auth.service';
@Injectable({
  providedIn: 'root'
})
export class AuthGurdService implements CanActivate{
  constructor(public auth: AuthService, public router: Router) {}  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
   let response:boolean;
   const requiredPermission = route.data.permission;
    if (this.auth.isUserLoggedIn()) {
       if(this.auth.hasPermission(requiredPermission)){
        return true;
       }
       alert("403: Not authorised to access resource");
       return false;
    } else {
      alert("401: Not authenticated");
      this.router.navigate(['auth']);
      return false;
    }
  }

}
