import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Email } from './email';
import { CommunicationService } from '../communication.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ITS_JUST_ANGULAR } from '@angular/core/src/r3_symbols';

@Component({
  selector: 'app-communication',
  templateUrl: './communication.component.html',
  styleUrls: ['../assets/css/material-dashboard.css?v=2.1.2']
})
export class CommunicationComponent implements OnInit {

  title="Emails";
     public emails!: Email[];
     public emailEmpty!: Email;
     public updateEmail!:Email;
     public subscribeEmail!:Email;
     public seachResult!:Email[];
     public viewEmail!:Email[];
  
    constructor(private CommunicationService:CommunicationService) { }
  
    ngOnInit() {
      this.getEmails();
    }
  
    public getEmails():void{
      this.CommunicationService.getEmails().subscribe(
          (response:Email[])=>{
           this.emails=response;
          },
          (error :HttpErrorResponse)=>{
           alert(error.message);
           
          }
      ); 
    }
 
 public searchaction(form:NgForm){
     let s=form.value.search;
     let newEmail=new Array;
     this.emails.forEach(e => {
       let recepient=e.recipient
         if(recepient===s){
           newEmail.push(e)
           this.seachResult=newEmail
           
         }
     } 
     
     );
    
     
    
 }

  }
