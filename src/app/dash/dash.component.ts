import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-root',
  templateUrl: './dash.component.html',
  styleUrls: ['../assets/css/material-dashboard.css?v=2.1.2']
})
export class DashComponent implements OnInit{
  title="Alpha";
  public userName:string | null=sessionStorage.getItem('username');
  
  ngOnInit() {
    
  }
  
  constructor(
    private authservice:AuthService
) { }


public logout(){
  this.authservice.logOut();
 }
 public allowed(permission:any){
  return this.authservice.hasPermission(permission);
 }
 
}