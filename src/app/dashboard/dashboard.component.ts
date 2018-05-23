import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { MainConfigService } from '../services/main-config.service';
import { PromosService } from '../services/promos.service';
import { AngularFireStorage } from 'angularfire2/storage';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import * as _ from 'lodash';

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
  products: any[] = [];
  filtredProducts: any[] = [];
  promos: any[];
  labelsList: string[] = [];
  site: any;

  ngOnInit() {
    this.promoSrv.getPromos()
      .map(res => {
        res.map(this.getImageUrl.bind(this));
        return res;
      })
      .subscribe((promos: [any]) => {
        this.promos = promos;
      });
    this.productSrv.getProducts()
      .map(products => {
        products.map(prod => {
          if (prod.labels) {
            this.labelsList = _.union(this.labelsList, prod.labels);
          }
        });
        return products;
      })
      .subscribe((prods: [any]) => {
        this.products = prods;
        this.filtredProducts = prods;
      });
    this.mainConfigSrv.getConfigs().subscribe((config: any) => {
      this.site = config;
    });
  }
  getImageUrl(item) {
    const ref = this.storage.ref(item.image);
    ref.getDownloadURL().subscribe(image => {
      item.image = image;
    });
    return item;
  }

  filterProductsListByLabels(labels) {
    this.filtredProducts = labels.length ? _.filter(this.products, { labels: labels }) : this.products;
  }
  filterProductsListByQuery(query) {
    console.log('on filtering', query);
    this.filtredProducts = query ? _.filter(this.products, prod => {
      return prod.title.toLowerCase().includes(query.toLowerCase());
    } ) : this.products;
  }
}
