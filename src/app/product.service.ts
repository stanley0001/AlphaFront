import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { dashData } from './dash/dashBordData';
import { Product } from './products/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  //get Dash Data
  getdashData() : Observable<dashData> {
    return this.http.get<dashData>(`${this.ApiUrl}/customers/dashBoardData`);
  }

  //create a subscription
  public Subscribe(data: NgForm): Observable<any> {
    return this.http.post<any>(`${this.ApiUrl}/customers/createSubscription`,data.value);
  }
  //upload loanbook
  uploadLoanBook(records: any[]): Observable<any> {
    return this.http.post<any>(`${this.ApiUrl}/loan-book/upload`,records);
  }
  private ApiUrl=environment.apiBaseUrl;
  constructor(private http:HttpClient) { }

  //get all Products
  public getProducts(): Observable<Product[]> {
     return this.http.get<Product[]>(`${this.ApiUrl}/products/allProducts`);
  }

  //add a Product
  public addProduct(Product:Product): Observable<Product>{
    return this.http.post<Product>(`${this.ApiUrl}/products/create`,Product);
  }

  //update a Product
  public updateProduct(Product:Product): Observable<Product>{
    return this.http.put<Product>(`${this.ApiUrl}/products/update`,Product);
  }
}