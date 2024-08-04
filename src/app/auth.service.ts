import { reset } from './auth/reset';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Auth } from './auth';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ResponseModel } from './auth/ResponseModel';

export class User{
  constructor(
    public status:string,
     ) {}
  
}

export class JwtResponse{
  constructor(
    public jwttoken:string,
     ) {}
}

@Injectable({
  providedIn: 'root'
})



export class AuthService {
  hasPermission(requiredPermission: any) {
    const authorities=sessionStorage.getItem('authorities');
    if (authorities!==null && authorities.includes(requiredPermission)) {
      return true;
    } else {
      return false;
    }
   
  }
  private ApiUrl=environment.apiBaseUrl;
  constructor(
    private httpClient:HttpClient,
    private router: Router,
  ) { 
     }
       
     authenticate(logins:Auth) {
       this.logOut();
      const username=logins.userName;
      const password=logins.password;
      sessionStorage.setItem('nothing',password)
       let response=this.httpClient.post<any>(`${this.ApiUrl}/authenticate`,logins);
       
       return response;
        }
        resetPassword(remail:reset) : Observable<ResponseModel>{
          this.logOut();
          return this.httpClient.post<ResponseModel>(`${this.ApiUrl}/users/resetPassword`,remail);
          
    
            }
        isUserLoggedIn() {
          let token = sessionStorage.getItem('backendToken')
          let user = sessionStorage.getItem('username')
          //let authUser = sessionStorage.getItem('authUser')
          if (user && token) {
            return true;
          }else{
            return false
          }
        }
      
        logOut() {
          sessionStorage.removeItem('backendToken')
          sessionStorage.removeItem('username')
          this.router.navigate(['auth'])
          
        }
        passwordConfirm(pass:string){
         const loggedPassword=sessionStorage.getItem('nothing');
         const providedPassword=pass;
         if (providedPassword===loggedPassword) {
           return true;
         }else{
           return false;
         }
        }

}
