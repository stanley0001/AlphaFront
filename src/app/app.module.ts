import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { AppComponent } from './app.component';
import { ClientsComponent } from './clients/clients.component';
import { UsersComponent } from './users/users.component';
import { DashComponent } from './dash/dash.component';
import { AuthComponent } from './auth/auth.component';
import { BpsComponent } from './bps/bps.component';
import { ReportsComponent } from './reports/reports.component';
import { CommunicationComponent } from './communication/communication.component';
import { ProductsComponent } from './products/products.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { IntercepterService } from './intercepter.service';
import { AuthGurdService as AuthGuard } from './auth-gurd.service'; 

const routes: Routes = [
  {
    path: 'dash',
    component: DashComponent,
  children: [
    
    {
      path: 'clients',
      component: ClientsComponent,
      canActivate: [AuthGuard]
    },
    {
      path: 'users',
      component: UsersComponent,
      canActivate: [AuthGuard]
    },
  {
    path: 'bps',
    component: BpsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'reports',
    component: ReportsComponent,
    canActivate: [AuthGuard]
  },
  
  {
    path: 'products',
  component: ProductsComponent,
  canActivate: [AuthGuard]
  },
  {
    path: 'communication',
    component: CommunicationComponent,
    canActivate: [AuthGuard]
  },
  {
    path: '**',
    component: CommunicationComponent
  },
  
  ],
    canActivate: [AuthGuard]
  },
  {
    path: 'auth',
    component: AuthComponent
  },
  {
    path: '**',
    component: AuthComponent
  },
];
@NgModule({
  declarations: [
    AppComponent,
    ClientsComponent,
    UsersComponent,
    DashComponent,
    AuthComponent,
    BpsComponent,
    ProductsComponent,
    ReportsComponent,
    CommunicationComponent,
    NotfoundComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    HttpClientModule, FormsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: IntercepterService, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

