import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit} from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from '../user';
import { Client } from './client';
import { ClientService } from '../client.service';
import { Product } from '../products/product';
import { ProductService } from '../product.service';
import { UsersService } from '../users.service';
import { ClientResponseModel } from './clientResponse';
import { PageEvent } from '@angular/material/paginator';
import { from } from 'rxjs';


@Component({
  selector: 'app-users',
  templateUrl: './clients.component.html',
  styleUrls: ['../assets/css/material-dashboard.css?v=2.1.2']
})
export class ClientsComponent implements OnInit {
     public title="Clients";
     public page = 1;
     public itemsPerPage = 10;
     public totalelements = 10;
     public pageSizes = [5, 10, 20, 50, 100];
     public clients:Client[] =[];
     public clientEmpty!: Client;
     public user!: User;
     public updateClient:Client | undefined;
     public subscribeClient!:Client;
     public products!: Product[];
     
  
    constructor(private clientService:ClientService,private userService:UsersService,private productService:ProductService,private router:Router) { }
  
    ngOnInit() {
      this.getClients();
    }
  
    public getClients():void{
      this.clientService.getClients(this.page-1,this.itemsPerPage).subscribe(
          (response:ClientResponseModel)=>{
           this.clients=response.body;
           this.totalelements=response.totalElements;
          //  this.to=response.totalElements;
          //  this.totalelements=response.totalElements;           
          },
          (error :HttpErrorResponse)=>{
           alert(error.message);
           
          }
      ); 
    }

    onPageChange(page: number) {
      this.page = page;
       this.getClients();
     }
     onItemsPerPageChange(item: number) {
      this.itemsPerPage = item;
       this.getClients();
     }
    onPageSizeChange(event: Event) {
      // console.log("event",event)
      const selectedValue = (event.target as HTMLSelectElement).value;
    
      console.log("selected page size ",selectedValue)
      this.itemsPerPage = Number.parseInt(selectedValue); 
      this.getClients()
    }
    public getProducts():void{
      this.productService.getProducts().subscribe(
          (response:Product[])=>{
           this.products=response;
          },
          (error :HttpErrorResponse)=>{
           alert(error.message);
           
          }
      ); 
    }
  
    public onAddClient(addClientForm:NgForm) : void{
      
         this.clientService.addClient(addClientForm.value).subscribe(
        (response:Client)=>{
          this.getClients();
           //create users detail
           this.user.email=response.email;
           this.user.userName=response.phoneNumber;
           this.user.documentNumber=response.documentNumber;
           this.user.firstName=response.firstName;
           this.user.lastName=response.lastName;
           this.user.phone=response.phoneNumber;
           this.user.roleId="2";
           this.user.createdAt=new Date;
           this.user.isActive=true;
           this.user.updatedAt=new Date;
           // call user service
          this.userService.addUser(this.user).subscribe(
           (response:User[])=>{
             alert("user added")
            },
            (error :HttpErrorResponse)=>{
             alert(error.message);
             
            }
         );
         },
         (error :HttpErrorResponse)=>{
          alert(error.message);
          
         }
         
      );
      document.getElementById('closebtn')?.click();
    
     }
     public onUpdateClient(UpdateClientForm:NgForm) : void{
       
      this.clientService.updateClient(UpdateClientForm.value).subscribe(
        (response:Client)=>{
          document.getElementById('updateFormClose')?.click();
          UpdateClientForm.resetForm
          alert('Client Updated');
          this.getClients();
         },
         (error :HttpErrorResponse)=>{
          alert(error.message);
          
         }
      );
      
     }
     public viewClient(client1:Client,mode:string):void{
      this.router.navigate(['admin/clientProfile'],{ queryParams: { id: client1.id } })
        
     }

 
  public onOpenModel(client1:Client,mode:string):void{
    
    const container=document.getElementById('addClientContainer');
    const button=document.createElement('button');
    button.type='button';
    button.style.display='none';
    button.setAttribute('data-toggle','modal');
    if(mode==='add'){
      
      button.setAttribute('data-target','#addClient');
    }
    if(mode==='updateClient'){
      
      this.updateClient=client1;
      button.setAttribute('data-target','#updateClient');
    }
    if(mode==='subscribeClient'){
      this.subscribeClient=client1;
      button.setAttribute('data-target','#subscribeClient');
    }
    
    container?.appendChild(button);
    button.click();
    
  }

  }
  