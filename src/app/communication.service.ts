import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Email } from './communication/email';

@Injectable({
  providedIn: 'root'
})
export class CommunicationService {
  private ApiUrl=environment.apiBaseUrl;
  constructor(private http:HttpClient) { }

  //get all Emails
  public getEmails(): Observable<Email[]> {
     return this.http.get<Email[]>(`${this.ApiUrl}/communication/Outbox`);
  }

  //add a Email
  public addEmail(Email:Email): Observable<Email>{
    return this.http.post<Email>(`${this.ApiUrl}/customers/create`,Email);
  }

  //update a Email
  public updateEmail(Email:Email): Observable<Email>{
    return this.http.post<Email>(`${this.ApiUrl}/customers/create`,Email);
  }

  //ad a subscription
  public addSubscription(request:any): Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Basic ' + btoa('stan254:dOu1kCkY')
      })
    };
    return this.http.post<any>(`${this.ApiUrl}/customers/createSubscription`,request);
  }
  
}