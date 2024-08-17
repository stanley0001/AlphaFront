import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class AuthInterceptorInterceptor implements HttpInterceptor {

  constructor(private router:Router) {}
  private handleError(err: HttpErrorResponse): Observable<any> {
    if (err.status === 401) {
      alert("Session Expired")
      sessionStorage.removeItem('username');
        this.router.navigate(['auth']);
        return of(err.message);
    }
    if (err.status === 403) {
      alert("You are not authorised to access this section")
    }
    if (err.status === 500) {
      alert("Server Error please contact your administrator")
    }
    return throwError(err);
}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = sessionStorage.getItem('backendToken');
    const headerSettings: {[name: string]: string | string[]; } = {};
  
    if (token) {
      headerSettings['Content-Type'] = 'application/json';
      const newHeader = new HttpHeaders(headerSettings);
        console.log(newHeader)
      const changedRequest = request.clone({
        setHeaders: {
          Authorization: token
        }
      });
     return next.handle(changedRequest).pipe(catchError(x=> this.handleError(x)));
    }else{
      return next.handle(request);
    } 
  }
  }
