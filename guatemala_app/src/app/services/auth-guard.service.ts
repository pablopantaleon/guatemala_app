import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from "@angular/router";
import { Storage } from '@ionic/storage';
import { BehaviorSubject } from 'rxjs';
import { ApiService } from './api.service'

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

	constructor(
    public apiService: ApiService
  ) {}

  canActivate(): boolean {
    return this.apiService.isAuthenticated();
  }
}
