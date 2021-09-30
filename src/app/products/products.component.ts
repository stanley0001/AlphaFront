import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ProductService } from '../product.service';
import { Product } from '../products/product';
import { User } from '../user';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['../assets/css/material-dashboard.css?v=2.1.2']
})
export class ProductsComponent implements OnInit {

  title="Products";
     public Products!: Product[];
     public ProductEmpty!: Product;
     public user!: User;
     public updateProduct!:Product;
  
    constructor(private ProductService:ProductService,private userService:UsersService) { }
  
    ngOnInit() {
      this.getProducts();
    }
  
    public getProducts():void{
      this.ProductService.getProducts().subscribe(
          (response:Product[])=>{
           this.Products=response;
          },
          (error :HttpErrorResponse)=>{
           alert(error.message);
           
          }
      ); 
    }
  
    public onAddProduct(addProductForm:NgForm) : void{
      
         this.ProductService.addProduct(addProductForm.value).subscribe(
        (response:Product)=>{
          this.getProducts();
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
     public onUpdateProduct(UpdateProductForm:NgForm) : void{
       
      this.ProductService.updateProduct(UpdateProductForm.value).subscribe(
        (response:Product)=>{
          document.getElementById('updateFormClose')?.click();
          UpdateProductForm.resetForm
          alert('Product Updated');
          this.getProducts();
         },
         (error :HttpErrorResponse)=>{
          alert(error.message);
          
         }
      );
      
     }
  /*
     public ontoggleUser(phone:string,status:boolean):void{
       this.UsersService.toggleUser(phone,status);
          this.getUsers();
         }
  
         */
        
  
  public onOpenModel(Product1:Product,mode:string):void{
    
    const container=document.getElementById('addProductContainer');
    const button=document.createElement('button');
    button.type='button';
    button.style.display='none';
    button.setAttribute('data-toggle','modal');
    if(mode==='add'){
      
      button.setAttribute('data-target','#addProduct');
    }
    if(mode==='updateProduct'){
      
      this.updateProduct=Product1;
      button.setAttribute('data-target','#updateProduct');
    }
    if(mode==='toggleProduct'){
      button.setAttribute('data-target','#toggleProduct');
    }
    
    container?.appendChild(button);
    button.click();
    
  }
  
  }