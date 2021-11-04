import { smsResponse } from './communication/smsResponse';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Email } from './communication/email';
import { messageFormData } from './communication/messageFormData';
import { smsModel } from './communication/smsModel';

@Injectable({
  providedIn: 'root'
})
export class CommunicationService {
  private ApiUrl=environment.apiBaseUrl;
  constructor(private http:HttpClient) { }
  //sending sms 
  public sendSms(data:smsModel): Observable<smsResponse[]> {
    alert("Sending"+data.contactList)
   return this.http.post<smsResponse[]>(`${this.ApiUrl}/customers/sendSms2`,data);
  }
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
   
    return this.http.post<any>(`${this.ApiUrl}/customers/createSubscription`,request);
  }
  
}