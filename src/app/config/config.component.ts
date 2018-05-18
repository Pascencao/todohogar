import { Component, OnInit } from '@angular/core';
import { MainConfigService } from '../services/main-config.service';
import { AngularFireStorage } from 'angularfire2/storage';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.scss']
})
export class ConfigComponent implements OnInit {
  promos: [any];
  products: [any];
  addNewPromo: Boolean = false;
  addNewProduct: Boolean = false;

  constructor(
    private mainConfigSrv: MainConfigService,
    private storage: AngularFireStorage
  ) { }

  // ngDoCheck(){
  // }
  ngOnInit() {
    this.getConfig();
    this.getPromos();
    this.getProducts();
  }
  promoSaved() {
    this.addNewPromo = false;
    this.getPromos();
  }
  productSaved() {
    this.addNewProduct = false;
    this.getProducts();
  }
  getConfig() {
    return this.mainConfigSrv.getConfigs().subscribe();
  }
  getProducts() {
    return this.mainConfigSrv.getProducts().subscribe(prods => {
      this.products = prods;
      console.log(prods);
      this.addNewProduct = !prods.length;
    });
  }
  getPromos() {
    return this.mainConfigSrv.getPromos()
    .subscribe(promos => {
      this.promos = promos;
      this.addNewPromo = !promos.length;
    });
  }
}
