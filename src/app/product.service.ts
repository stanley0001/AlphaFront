import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Product } from './products/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private ApiUrl=environment.apiBaseUrl;
  constructor(private http:HttpClient) { }

  //get all Products
  public getProducts(): Observable<Product[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Basic ' + btoa('stan254:dOu1kCkY')
      })
    };
    
     return this.http.get<Product[]>(`${this.ApiUrl}/products/allProducts`,httpOptions);
  }

  //add a Product
  public addProduct(Product:Product): Observable<Product>{
    return this.http.post<Product>(`${this.ApiUrl}/customers/create`,Product);
  }

  //update a Product
  public updateProduct(Product:Product): Observable<Product>{
    return this.http.post<Product>(`${this.ApiUrl}/customers/create`,Product);
  }
}