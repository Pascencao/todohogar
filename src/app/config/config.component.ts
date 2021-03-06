import { Component, OnInit } from '@angular/core';
import { MainConfigService } from '../services/main-config.service';
import { AngularFireStorage } from 'angularfire2/storage';
import * as _ from 'lodash';
import { Promo } from '../models/promo.interface';
import { Product } from '../models/product.interface';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.scss']
})
export class ConfigComponent implements OnInit {
  promos: Promo[];
  products: Product[];
  editingProduct: any;
  editingPromo: any;
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
    this.editingPromo = new Promo();
    this.getPromos();
  }
  productSaved() {
    this.addNewProduct = false;
    this.editingProduct = null;
    this.getProducts();
  }
  getConfig() {
    return this.mainConfigSrv.getConfigs().subscribe();
  }
  getProducts() {
    return this.mainConfigSrv.getProducts()
    .map(this.setId)
    .subscribe(prods => {
      this.products = prods;
      this.addNewProduct = !prods.length;
    });
  }
  getPromos() {
    return this.mainConfigSrv.getPromos()
    .map(this.setId)
    .subscribe(promos => {
      this.promos = promos;
      this.addNewPromo = !promos.length;
    });
  }
  cancelEdit() {
    this.addNewProduct = false;
    this.editingProduct = null;
    this.editingPromo = null;
    this.addNewPromo = false;
  }
  editProduct(prod) {
    this.editingProduct = prod;
    this.addNewProduct = true;
  }
  editPromo(promo) {
    this.editingPromo = promo;
    this.addNewPromo = true;
  }
  setId (items) {
    return _.map(items, (val, key) => {
      val['id'] = key;
      return val;
    });
  }
}
