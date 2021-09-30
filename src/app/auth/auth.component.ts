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

  constructor(
      private route: ActivatedRoute,
      private router: Router,
      private authservice:AuthService
  ) { }

  ngOnInit() {
    this.openForm('login')
  }

  login(logins:NgForm):void {
    this.authservice.authenticate(logins.value).subscribe(
      (response:ResponseModel)=>{ 
        sessionStorage.setItem('backendToken',response.message)
        if (this.authservice.isUserLoggedIn()) {
          this.router.navigate(['dash'])
        }else{
          alert("please login")
        }
      
       
      },
      (error:HttpErrorResponse)=>{
        alert(error.error.error)
      }
    );
      
  }
 resetPassword(logins:NgForm):void {
  this.authservice.resetPassword(logins.value.email).subscribe(
    (response:ResponseModel)=>{ 
      if (response.httpCode===200) {
        alert("Reset link have been sent")
        this.router.navigate(['auth'])
      }else{
        alert("Error occured")
      }
    
     
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