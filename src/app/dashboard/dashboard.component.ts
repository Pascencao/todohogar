import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { MainConfigService } from '../services/main-config.service';
import { PromosService } from '../services/promos.service';
import { AngularFireStorage } from 'angularfire2/storage';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [NgbCarouselConfig]
})
export class DashboardComponent implements OnInit {

  constructor(
    private config: NgbCarouselConfig,
    private productSrv: ProductsService,
    private promoSrv: PromosService,
    private storage: AngularFireStorage,
    private mainConfigSrv: MainConfigService
  ) {
    config.interval = 3000;
    config.wrap = true;
    config.keyboard = false;
   }
  products: [any];
  promos: [any];
  site: any;

  ngOnInit() {
    this.promoSrv.getPromos()
    // .map(this.getImageUrl)
    .map(res => {
      res.map(this.getImageUrl.bind(this));
      return res;
    })
    .subscribe((promos: [any]) => {
      console.log(promos);
      this.promos = promos;
    });
    this.productSrv.getProducts()
    // .map(this.getImageUrl)
    .subscribe((prods: [any]) => {
      this.products = prods;
    });
    this.mainConfigSrv.getConfigs().subscribe((config: any) => {
      this.site = config;
    });
  }
  getImageUrl(item) {
    console.log(item);
    const ref = this.storage.ref(item.image);
    ref.getDownloadURL().subscribe(image => {
      item.image = image;
    });
    return item;
  }

}
