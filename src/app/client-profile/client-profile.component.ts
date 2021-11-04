import { SubscriptionRequest } from './../clients/subscriptionrequest';
import { NgForm } from '@angular/forms';
import { Product } from './../products/product';
import { ProductService } from './../product.service';
import { transactions } from './transaction';
import { ClientProfile } from './ClientProfile';
import { LoanAccount } from './LoanAccount';
import { Account } from './../clients/account';
import { ClientService } from './../client.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-client-profile',
  templateUrl: './client-profile.component.html',
  styleUrls: ['../assets/css/material-dashboard.css?v=2.1.2']
})
export class ClientProfileComponent implements OnInit {
  public CurrentTransactions!: transactions[];
  public productName!: String;
  public productId!: Number;
  public loanAccounts!: LoanAccount[];
  public profile!: ClientProfile;
  public transactionActive!: Boolean;
  public products!: Product[];
  constructor(private router:ActivatedRoute,private clientService:ClientService,private ProductService:ProductService) { }
    
  ngOnInit(): void {
    this.loadInfo(this.router.snapshot.queryParams.id)
     
  }
   public loadInfo(id:Number){
    this.loadClientTransactions(id);
    this.loadClientProfile(id);
    this.getProducts();
   }
   public getProducts():void{
    
    this.ProductService.getProducts().subscribe(
        (response:Product[])=>{
         this.products=response;
        },
        (error :HttpErrorResponse)=>{
         alert(error.message);
         
        }
    ); 
  }
  public loadClientTransactions(id:Number){
    this.clientService.getLoanAccount(id).subscribe(
      (response:LoanAccount[])=>{
        this.loanAccounts=response;
        this.loanAccounts.forEach(account1 => {
          account1.transactions.forEach(transaction => {
            transaction.amount=parseInt(transaction.finalBalance)-parseInt(transaction.initialBalance);
          });
        });
       
       },
       (error :HttpErrorResponse)=>{
        alert(error.message);
        
       }
    );
  }
  public loadClientProfile(id:Number){
    this.clientService.getClientInfo(id).subscribe(
      (response:ClientProfile)=>{
        this.profile=response;
       },
       (error :HttpErrorResponse)=>{
        alert(error.message);
        
       }
    );
  }
  public onOpenModel(transactions:transactions[],mode:string):void{
    
    const container=document.getElementById('transactionTable');
    const button=document.createElement('button');
    button.type='button';
    button.style.display='none';
    button.setAttribute('data-toggle','modal');
      this.CurrentTransactions=transactions;
      button.setAttribute('data-target',mode);
    
    container?.appendChild(button);
    button.click();
    
}

public onChange(productName:String,productid:Number,mode:string):void{

  const container=document.getElementById('d-grid');
  const button=document.createElement('button');
  button.type='button';
  button.style.display='none';
  button.setAttribute('data-toggle','modal');
    
    button.setAttribute('data-target',mode);
  this.productName=productName;
  this.productId=productid;
  container?.appendChild(button);
  button.click();
  
}
public subscribeP(data:NgForm){
  this.ProductService.Subscribe(data).subscribe(
    (response:any)=>{
     alert("subscription Added")
    },
    (error :HttpErrorResponse)=>{
     alert(error.message);
     
    }
); 
}
}
