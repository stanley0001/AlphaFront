import { AuthInterceptorInterceptor } from './auth-interceptor.interceptor';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
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
import { MatPaginator } from '@angular/material/paginator';

const routes: Routes = [
  {
    path: 'admin',
    component: DashComponent,
    data: { permission: 'ADMIN' },
  children: [
    {
      path: 'dash',
      component: TransactionsComponent,
      canActivate: [AuthGuard],
      data: { permission: 'ADMIN' },
    },
    {
      path: 'clientProfile',
      component: ClientProfileComponent,
      canActivate: [AuthGuard],
      data: { permission: 'canViewClientProfile' }
    },
    {
      path: 'ClientTransactions',
      component: TransactionsComponent,
      canActivate: [AuthGuard],
      data: { permission: 'ADMIN' }
    },
    {
      path: 'adminActions',
      component: ClientProfileComponent,
      canActivate: [AuthGuard],
      data: { permission: 'canViewAdminActions' }
    },
    {
      path: 'clients',
      component: ClientsComponent,
      children: [
       
      ],
      canActivate: [AuthGuard],
      data: { permission: 'canViewClients' }
    },
    {
      path: 'users',
      component: UsersComponent,
      canActivate: [AuthGuard],
      data: { permission: 'canViewUsers' }
    },
    {
      path: 'bps',
      component: BpsComponent,
      canActivate: [AuthGuard],
      data: { permission: 'canViewBps' }
    },
    {
      path: 'loan-book-upload',
      component: LoanBookComponent,
      canActivate: [AuthGuard],
      data: { permission: 'VIEW_CUSTOM_LOAN_BOOK_UPLOAD' }
    },
  {
    path: 'reports',
    component: ReportsComponent,
    canActivate: [AuthGuard],
    data: { permission: 'canViewReports' }
  },
  
  {
    path: 'products',
  component: ProductsComponent,
  canActivate: [AuthGuard],
  data: { permission: 'canViewProducts' }
  },
  {
    path: 'communication',
    component: CommunicationComponent,
    canActivate: [AuthGuard],
    data: { permission: 'canViewCommunication' }
  },
  {
    path: '**',
    component: TransactionsComponent,
    data: { permission: 'ADMIN' }
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
@NgModule({ declarations: [
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
    bootstrap: [AppComponent], imports: [RouterModule.forRoot(routes),
        BrowserModule,
        NgxPaginationModule,
        FormsModule], providers: [
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorInterceptor, multi: true },
        provideHttpClient(withInterceptorsFromDi()),
    ] })
export class AppModule { }

