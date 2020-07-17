import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

import { UserResponse } from '../models/user-response';
import { AllPromosResponse } from '../models/all-promos-response';
import { Promo } from '../models/promo';

import { Observable, throwError } from 'rxjs';
import { retry, catchError, flatMap } from 'rxjs/operators';

import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { Platform } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  // API path
  base_path = 'http://127.0.0.1:8000/api';
  authState = new BehaviorSubject(false);
  token = ""

  constructor(
    private router: Router,
    private http: HttpClient,
    private storage: Storage,
    private platform: Platform
  ) {
    this.platform.ready().then(() => {
      this.ifLoggedIn();
    });
  }

  ifLoggedIn() {
    this.storage.get('TOKEN').then((response) => {
      if (response) {
        this.token = response;
        this.authState.next(true);
      }
    });
  }

  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  // Handle API errors
  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };

  login(item) {
    this.http
      .post<UserResponse>(this.base_path + '/login', JSON.stringify(item), this.httpOptions)
      .pipe(catchError(this.handleError))
      .subscribe((response) => {
        this.token = response.access_token;          
        this.storage.set('TOKEN', response.access_token).then((response) => {
          this.authState.next(true);
          this.router.navigate(['/promo']);          
        });
      });
  }

  logout() {
    this.storage.remove('TOKEN').then(() => {
      this.authState.next(false);      
      this.router.navigate(['login']);      
    });
  }

  registerUser(item) {
    this.http
      .post<UserResponse>(this.base_path + '/register', JSON.stringify(item), this.httpOptions)
      .pipe(catchError(this.handleError))
      .subscribe((response) => {
        this.router.navigate(['/login']);          
      });
  }

  getAllPromos(): Observable<AllPromosResponse> {
    return this.http
      .get<AllPromosResponse>(this.base_path + '/promo', { headers: new HttpHeaders({'Authorization': 'Bearer ' + this.token})
 })
      .pipe(catchError(this.handleError));
  }

  getPromo(id): Observable<Promo> {
    return this.http
      .get<Promo>(this.base_path + '/promo/' + id, { headers: new HttpHeaders({'Authorization': 'Bearer ' + this.token})
 })
      .pipe(catchError(this.handleError))
  }

  isAuthenticated() {
    return this.authState.value;
  }
}
