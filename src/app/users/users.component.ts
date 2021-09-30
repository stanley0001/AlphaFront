import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from '../user';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['../assets/css/material-dashboard.css?v=2.1.2']
})
export class UsersComponent implements OnInit {
    title="Users";
     public users:User[] | undefined;
     public userEmpty!: User;
     public updateUser!:User;
  
    constructor(private UsersService:UsersService) { }
  
    ngOnInit() {
      this.getUsers();
    }
  
    public getUsers():void{
      this.UsersService.getUsers().subscribe(
          (response:User[])=>{
           this.users=response;
          },
          (error :HttpErrorResponse)=>{
           alert(error.message);
           
          }
      );
    }
  
    public onAddUser(addUserForm:NgForm) : void{
      this.UsersService.addUser(addUserForm.value).subscribe(
        (response:User[])=>{
          console.log(response)
          this.getUsers();
         },
         (error :HttpErrorResponse)=>{
          alert(error.message);
          
         }
      );
      document.getElementById('closebtn')?.click();
     }
     public onUpdateUser(UpdateUserForm:NgForm) : void{
      this.UsersService.updateUser(UpdateUserForm.value).subscribe(
        (response:User)=>{
          document.getElementById('updateFormClose')?.click();
          UpdateUserForm.resetForm
          alert('User Updated');
          this.getUsers();
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
        
  
  public onOpenModel(user:User,mode:string):void{
    
    const container=document.getElementById('addUserContainer');
    const button=document.createElement('button');
    button.type='button';
    button.style.display='none';
    button.setAttribute('data-toggle','modal');
    if(mode==='add'){
      
      button.setAttribute('data-target','#addUser');
    }
    if(mode==='updateUser'){
      
      this.updateUser=user;
      button.setAttribute('data-target','#updateUser');
    }
    if(mode==='toggleUser'){
      button.setAttribute('data-target','#toggleUser');
    }
    
    container?.appendChild(button);
    button.click();
    
  }
  
  }
  