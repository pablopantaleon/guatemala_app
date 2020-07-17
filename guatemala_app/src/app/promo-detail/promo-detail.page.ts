import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';
import { Promo } from '../models/promo';

@Component({
  selector: 'app-promo-detail',
  templateUrl: './promo-detail.page.html',
  styleUrls: ['./promo-detail.page.scss'],
})
export class PromoDetailPage implements OnInit {

  public promo: Promo;

  constructor(
    private apiService: ApiService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.apiService.getPromo(id).subscribe((response) => {
    	this.promo = response;
    })
  }

  getBackButtonText() {
    const win = window as any;
    const mode = win && win.Ionic && win.Ionic.mode;
    return mode === 'ios' ? 'Inbox' : '';
  }

}
