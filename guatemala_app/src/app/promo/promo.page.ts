import { Component, OnInit } from '@angular/core';

import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-promo',
  templateUrl: './promo.page.html',
  styleUrls: ['./promo.page.scss'],
})
export class PromoPage implements OnInit {

  promosData: any;

  constructor(
    public apiService: ApiService
  ) {
    this.promosData = [];
  }

  ngOnInit() {
    
  }

  ionViewWillEnter() {
    this.getAllPromos();
  }

  getAllPromos() {
    //Get saved list of students
    this.apiService.getAllPromos().subscribe(response => {
      this.promosData = response.promos;
    })
  }

  logOut() {
    this.apiService.logout();
  }
}
