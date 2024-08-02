import { AuthInterceptorInterceptor } from './auth-interceptor.interceptor';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
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
import { AuthGurdService as AuthGuard } from './auth-gurd.service'; 
import { LoggedInGuardService as loginGuard} from './loggedin-gurd.service';
import { ClientProfileComponent } from './client-profile/client-profile.component';
import { BioDataComponent } from './bio-data/bio-data.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { LoanBookComponent } from './loan-book-upload/loan.component';

const routes: Routes = [
  {
    path: 'admin',
    component: DashComponent,
  children: [
    {
      path: 'dash',
      component: TransactionsComponent,
      canActivate: [AuthGuard]
    },
    {
      path: 'clientProfile',
      component: ClientProfileComponent,
      canActivate: [AuthGuard]
    },
    {
      path: 'ClientTransactions',
      component: TransactionsComponent,
      canActivate: [AuthGuard]
    },
    {
      path: 'adminActions',
      component: ClientProfileComponent,
      canActivate: [AuthGuard]
    },
    {
      path: 'clients',
      component: ClientsComponent,
      children: [
       
      ],
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
      path: 'loan-book-upload',
      component: LoanBookComponent,
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
    component: TransactionsComponent
  },
  
  ],
    canActivate: [AuthGuard]
  },
  {
    path: 'auth',
    component: AuthComponent,
    canActivate: [loginGuard]
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
    NotfoundComponent,
    ClientProfileComponent,
    BioDataComponent,
    TransactionsComponent,
    LoanBookComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    HttpClientModule, FormsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

