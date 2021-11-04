import { smsModel } from './smsModel';
import { messageFormData } from './messageFormData';
import { NgForm } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Email } from './email';
import { CommunicationService } from '../communication.service';
import { HttpErrorResponse } from '@angular/common/http';
import { smsResponse } from './smsResponse';
import { Papa } from 'ngx-papaparse';
import { CsvData } from './csvData';


@Component({
  selector: 'app-communication',
  templateUrl: './communication.component.html',
  styleUrls: ['../assets/css/material-dashboard.css?v=2.1.2']
})
export class CommunicationComponent implements OnInit {

  title="Communication";
     public emails!: Email[];
     public emailEmpty!: Email;
     public updateEmail!:Email;
     public subscribeEmail!:Email;
     public seachResult!:Email[];
     public viewEmail!:Email[];
     public messageformdata!:messageFormData;
     public contactList!: [String];
     public smsM: smsModel=new smsModel;
     public listFetch!: String[];
     public records: any[] = [];
     @ViewChild('csvReader') csvReader: any;
     jsondatadisplay:any;

  
    constructor(private CommunicationService:CommunicationService,private papa: Papa) { 
      
    }
  
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

 public sendSms(formData:NgForm){
   
   this.messageformdata=formData.value;
   this.contactList=[""];
   
    if (this.messageformdata.contactListid!="") {
        
      //fetch contact list assign to the variable
     this.listFetch=["254743696253","254743696252","254743696250","254743696251"];
     this.listFetch.forEach(contactS => {
      this.contactList.push(contactS)
     });
      
    }
  //push single receipient if any
  if (this.messageformdata.receipient!="") {
    
    this.contactList.push(this.messageformdata.receipient);
    
  }
  
  const index = this.contactList.indexOf("");
if (index > -1) {
  this.contactList.splice(index, 1);
}
    this.smsM.message=this.messageformdata.message;
    this.smsM.contactList=this.contactList;
  if (this.messageformdata.message=="") {
    alert("Incomplete process send message")
  }else{
//perform send logic
  this.CommunicationService.sendSms(this.smsM).subscribe(
    (response:smsResponse[])=>{
     alert("response")
    },
    (error :HttpErrorResponse)=>{
     alert(error.message);
     
    }
); 
  }
  
 }
 public sendEmail(formData:NgForm){
  this.messageformdata=formData.value;


}
//convert file to json
uploadListener($event: any): void {

  let text = [];
  let files = $event.srcElement.files;

  if (this.isValidCSVFile(files[0])) {

    let input = $event.target;
    let reader = new FileReader();
    reader.readAsText(input.files[0]);
    reader.onload = () => {
      let csvData = reader.result;
      let csvRecordsArray = (<string>csvData).split(/\r\n|\n/);

      let headersRow = this.getHeaderArray(csvRecordsArray);

      this.records = this.getDataRecordsArrayFromCSVFile(csvRecordsArray, headersRow.length);
    };

    reader.onerror = function () {
      console.log('error is occured while reading file!');
    };

  } else {
    alert("Please import valid .csv file.");
    this.fileReset();
  }
}
//get data from csv
getDataRecordsArrayFromCSVFile(csvRecordsArray: any, headerLength: any) {
  let csvArr = [];

  for (let i = 1; i < csvRecordsArray.length; i++) {
    let curruntRecord = (csvRecordsArray[i]).split(',');
    if (curruntRecord.length == headerLength) {
      let csvRecord: CsvData = new CsvData();
      csvRecord.mobile = curruntRecord[0].trim();
      csvRecord.name = curruntRecord[1].trim();
      csvRecord.email = curruntRecord[2].trim();
      csvArr.push(csvRecord);
    }
  }
  return csvArr;
}
//check etension
isValidCSVFile(file: any) {
  return file.name.endsWith(".csv");
}

getHeaderArray(csvRecordsArr: any) {
  let headers = (csvRecordsArr[0]).split(',');
  let headerArray = [];
  for (let j = 0; j < headers.length; j++) {
    headerArray.push(headers[j]);
  }
  return headerArray;
}

fileReset() {
  this.csvReader.nativeElement.value = "";
  this.records = [];
  this.jsondatadisplay = '';
}

getJsonData(){
  this.jsondatadisplay = JSON.stringify(this.records);
}


  }
