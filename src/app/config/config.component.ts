import { Component, OnInit } from '@angular/core';
import { MainConfigService } from '../services/main-config.service';
import { AngularFireStorage } from 'angularfire2/storage';
import * as _ from 'lodash';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.scss']
})
export class ConfigComponent implements OnInit {
  promos: any[];
  products: any[];
  editingProduct: any;
  addNewPromo: Boolean = false;
  addNewProduct: Boolean = false;

  constructor(
    private mainConfigSrv: MainConfigService,
    private storage: AngularFireStorage
  ) { }

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
    return this.mainConfigSrv.getProducts()
    .map(prods => {
      const prodList = [];
      _.forEach(prods, (val, key) => {
        val['id'] = key;
        prodList.push(val);
      });

      // console.log(prodList);
      return prodList;
    })
    .subscribe(prods => {
      this.products = prods;
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
  cancelEdit(){
    this.addNewProduct = false;
    this.editingProduct = null;
  }
  editProduct(prod) {
    this.editingProduct = prod;
    this.addNewProduct = true;
  }
}
