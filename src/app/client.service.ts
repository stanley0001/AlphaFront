import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Client } from './clients/client';
import { SubscriptionRequest } from './clients/subscriptionrequest';
@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private ApiUrl=environment.apiBaseUrl;
  constructor(private http:HttpClient) { }

  //get all clients
  public getClients(): Observable<Client[]> {
  
    
     return this.http.get<Client[]>(`${this.ApiUrl}/customers/findall`);
  }

  //add a client
  public addClient(client:Client): Observable<Client>{
    return this.http.post<Client>(`${this.ApiUrl}/customers/create`,client);
  }

  //update a client
  public updateClient(client:Client): Observable<Client>{
    return this.http.post<Client>(`${this.ApiUrl}/customers/create`,client);
  }

  //ad a subscription
  public addSubscription(request:any): Observable<any>{
  
    return this.http.post<any>(`${this.ApiUrl}/customers/createSubscription`,request);
  }
  
}
