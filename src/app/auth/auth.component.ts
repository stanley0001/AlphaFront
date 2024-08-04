import { authResponse } from './authResponse';
import { reset } from './reset';
import { AuthService, JwtResponse } from './../auth.service';
import { NgForm } from '@angular/forms';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ResponseModel } from './ResponseModel';

@Component({
  selector: 'app-root',
  templateUrl: './auth.component.html',
  styleUrls: ['../assets/css/material-dashboard.css?v=2.1.2']
})
export class AuthComponent implements OnInit {
  model: any = {};
  Reset!: reset;
  authMessage!: String;
  constructor(
      private route: ActivatedRoute,
      private router: Router,
      private authservice:AuthService
  ) { }

  ngOnInit() {
    this.openForm('login')
  }

  login(logins:NgForm):void {
    this.resetAuthMessage;
    this.authservice.authenticate(logins.value).subscribe(
      (response:authResponse)=>{ 
        if (response.reason==="Authenticated") {
        document.getElementById('Lclosebtn')?.click();
        
        // sessionStorage.setItem('username',response.user.username)
        sessionStorage.setItem('username',"admin")
        sessionStorage.setItem('authority',"ADMIN")
        sessionStorage.setItem('authorities',"ADMIN")
        // response.user.authorities.forEach(auth => {
        //   sessionStorage.setItem('authority',auth.authority)
        // });
        
        let receivedToken='Bearer '+response.message;
        sessionStorage.setItem('backendToken',receivedToken);
        if (this.authservice.isUserLoggedIn()) {
          this.router.navigate(['admin/dash'])
        }else{
          alert("please login")
        }
      }else{
        this.authMessage=response.reason;
      }
      },
      (error:HttpErrorResponse)=>{
        if (error.status===401) {
          this.authMessage="Wrong PassWord!";
        }else{
        alert(error.error.error)
        }
      }
    );
    
      
  }
  resetAuthMessage():void{
    this.authMessage!;
  }
 resetPassword(logins:NgForm):void {
   this.resetAuthMessage;
   this.Reset=logins.value;
  this.authservice.resetPassword(this.Reset).subscribe(
    (response:ResponseModel)=>{ 
      this.authMessage=response.message;
    },
    (error:HttpErrorResponse)=>{
      alert(error.error.error)
    }
  );
    
}
  public openForm(mode:string):void{
    
    const container=document.getElementById('auth');
    const button=document.createElement('button');
    const closeButtonL =document.getElementById('Lclosebtn');
    const closeButtonR =document.getElementById('Rclosebtn');
    button.type='button';
    button.style.display='none';
    button.setAttribute('data-toggle','modal');
    if(mode==='reset'){
      closeButtonL?.click();
      button.setAttribute('data-target','#reset');
    }
    if(mode==='login'){
      closeButtonR?.click();
      button.setAttribute('data-target','#login');
    }
    
    
    container?.appendChild(button);
    button.click();
    
  }
}