import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { dashData } from '../dash/dashBordData';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['../assets/css/material-dashboard.css?v=2.1.2']
})
export class TransactionsComponent implements OnInit {

  title="transactions";
     public data!: dashData;
  
  constructor(private ProductService:ProductService) {}

  ngOnInit(){
    this.getDashData();
  }

  public getDashData():void{
    this.ProductService.getdashData().subscribe(
        (response:dashData)=>{
         this.data=response;
        },
        (error :HttpErrorResponse)=>{
         alert(error.message);
         
        }
    ); 
  }

}
