import { Component, OnInit, Input } from '@angular/core';
import { AngularFireStorage } from 'angularfire2/storage';
import { LocalStorageService } from 'angular-2-local-storage';
import { Product } from '../models/product.interface';
import * as _ from 'lodash';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent implements OnInit {
  @Input() product: Product;
  isInCart: Boolean = false;

  constructor(
    private storage: AngularFireStorage,
    private localStorage: LocalStorageService
  ) { }

  ngOnInit() {
    const ref = this.storage.ref(this.product.image);
    const cart = this.localStorage.get('cart');
    this.isInCart = _.includes(cart, this.product.id);

    ref.getDownloadURL().subscribe(image => {
      this.product.image = image;
    });
  }
  addToCart() {
    const cart = this.localStorage.get<[any]>('cart') || [];
    if (this.isInCart) {
      const ind = cart.indexOf(this.product.id);
      cart.splice(ind, 1);
      this.isInCart = false;
    } else {
      this.isInCart = true;
      cart.push(this.product.id);
    }
    this.localStorage.set('cart', cart);
  }

}
