import { Component, OnInit } from '@angular/core';
import { BannerModel } from '../../sales/models/banner.model';
@Component({
  selector: 'app-banner', 
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent implements OnInit {

  bannerItems: BannerModel[] = new Array<BannerModel>();
  constructor() { }

  ngOnInit() {
    this.bannerItems.push({title: 'Men', description: 'Mạnh Mẽ Quyến Rũ' , img: '../../../assets/img/banner/banner-01.png'});
    this.bannerItems.push({title: 'Women', description: 'Sang Trọng Qúy Phái' , img: '../../../assets/img/banner/banner-02.png'});
    this.bannerItems.push({title: 'Couple', description: '1 Cặp Trời Sinh' , img: '../../../assets/img/banner/banner-03.png'});
  }

}
