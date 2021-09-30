import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Auth } from './auth';
import { environment } from 'src/environments/environment';

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
  private ApiUrl=environment.apiBaseUrl;
  constructor(
    private httpClient:HttpClient,
    private router: Router,
  ) { 
     }
       
     authenticate(logins:Auth) {
      const username=logins.userName;
      const password=logins.password;
      sessionStorage.setItem('username',username)
      sessionStorage.setItem('nothing',password)
      return this.httpClient.post<any>(`${this.ApiUrl}/authenticate`,logins);

        }
        resetPassword(remail:string) {
          const email=remail;
          return this.httpClient.post<any>(`${this.ApiUrl}/reset`,email);
    
            }
        isUserLoggedIn() {
          let token = sessionStorage.getItem('backendToken')
          let user = sessionStorage.getItem('username')
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
