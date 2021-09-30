import { getLocaleDateFormat } from "@angular/common";
export interface Product{
     active : Boolean;
     code : String ;
     dailyInterest : Boolean ;
     id : Number ;
     interest : Number ;
     interestUpfront : Boolean ;
     maxLimit : Number ;
     minLimit : Number ;
     name :  String  ;
     rollOver : Boolean ;
     term : Number ;
     timeSpan :  String  ;
     topUp : Boolean ;
     transactionType :  String 
  }