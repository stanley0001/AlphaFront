import { ClientProfile } from './client-profile/ClientProfile';
import { LoanAccount } from './client-profile/LoanAccount';
import { Account } from './clients/account';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Client } from './clients/client';
@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private ApiUrl=environment.apiBaseUrl;
  constructor(private http:HttpClient) { }
  //getting all transactions
  public getLoanAccount(id: Number): Observable<LoanAccount[]>{
    return this.http.get<LoanAccount[]>(`${this.ApiUrl}/products/getLoanAccountId`+id);
  }
  //getting client infoemation
  public getClientInfo(id: Number): Observable<ClientProfile>{
    return this.http.get<ClientProfile>(`${this.ApiUrl}/customers/findCus`+id);
    
  }

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

  //add a subscription
  public addSubscription(request:any): Observable<any>{
  
    return this.http.post<any>(`${this.ApiUrl}/customers/createSubscription`,request);
  }
  
}
