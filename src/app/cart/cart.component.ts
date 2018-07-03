import { EmailsSenderService } from '../services/email-sender.service';
import { LocalStorageService } from 'angular-2-local-storage';
import { ProductsService } from '../services/products.service';
import { Component, OnInit, DoCheck } from '@angular/core';
import { Product } from '../models/product.interface';
import { Observable } from 'rxjs/Observable';
import * as _ from 'lodash';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit, DoCheck {

  constructor(
    private localStorage: LocalStorageService,
    private productsSrv: ProductsService,
    private emailSrv: EmailsSenderService
  ) { }
  isOpen: Boolean = false;
  cart: [any];
  total = 0;
  cartItems: Product[] = new Array();

  ngOnInit() {
    this.cart = this.localStorage.get<[any]>('cart');
  }
  ngDoCheck() {
    this.cart = this.localStorage.get<[any]>('cart');
  }
  openCart() {
    console.log('cart is opening');
    this.isOpen = !this.isOpen;
    this.getProducts();
  }
  getProducts() {
    const products = [];
    this.cartItems = [];
    _.map(this.cart, id => {
      console.log(id);
      this.productsSrv.getProductById(id)
        .subscribe((prod: Product) => {
          this.total += prod.price ? parseInt(prod.price, 10) : 0;
          this.cartItems.push(prod);
        });
    });
  }
  checkout() {
    this.emailSrv.sendEmail(this.cart[0])
    // .subscribe(res => {
    //   console.log(res)
    // });
  }
}
