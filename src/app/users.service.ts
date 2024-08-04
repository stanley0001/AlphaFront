import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './user';
import { environment } from 'src/environments/environment';
import { HttpHeaders } from '@angular/common/http';
import { Auth } from './auth';
import { Role } from './role';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
 
  private ApiUrl=environment.apiBaseUrl;
  constructor(private http:HttpClient) { }

  //get all users
  public getUsers(): Observable<User[]> {
     return this.http.get<User[]>(`${this.ApiUrl}/users/all`);
  }
  getRoles():Observable<Role[]> {
    return this.http.get<Role[]>(`${this.ApiUrl}/users/security/roles`);
   }
  //add a user
  public addUser(user:User): Observable<User[]>{
    return this.http.post<User[]>(`${this.ApiUrl}/users/create`,user);
  }
   //update a user
   public updateUser(user:User): Observable<User>{
    return this.http.post<User>(`${this.ApiUrl}/users/update`,user);
  }
  
  
/*
   //toggle a user
   public toggleUser(phone:string,status:boolean): void{
    this.http.put(`${this.ApiUrl}/users/changeStatus`,phone);
  } */

 /* public login(logins:Auth): Observable<any>{
    
       return this.http.post(`${this.ApiUrl}/authenticate`,logins); 
  }*/
}
 