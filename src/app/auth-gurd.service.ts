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
   const authorities=sessionStorage.getItem('authorities');
   console.log("authorities",authorities)
   console.log("requiredPermission",requiredPermission)

    if (authorities!==null && authorities.includes(requiredPermission)) {
      return true;
    } else {
      alert("403: Not authorised");
      return false;
    }

  }

}
