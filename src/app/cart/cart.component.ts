import { EmailsSenderService } from '../services/email-sender.service';
import { LocalStorageService } from 'angular-2-local-storage';
import { ProductsService } from '../services/products.service';
import { Component, OnInit, DoCheck, ViewChild } from '@angular/core';
import { Product } from '../models/product.interface';
import { Observable } from 'rxjs/Observable';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import * as _ from 'lodash';
import { AngularFireStorage } from 'angularfire2/storage';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit, DoCheck {
  @ViewChild('content') content: NgbModal;

  constructor(
    private storage: AngularFireStorage,
    private localStorage: LocalStorageService,
    private productsSrv: ProductsService,
    private modalService: NgbModal,
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
    this.isOpen = !this.isOpen;
    this.getProducts();
  }
  getProducts() {
    const products = [];
    this.cartItems = [];
    _.map(this.cart, id => {
      this.productsSrv.getProductById(id)
        .subscribe((prod: Product) => {
          this.total += prod.price ? parseInt(prod.price, 10) : 0;
          this.cartItems.push(prod);
          const ref = this.storage.ref(prod.image);

          ref.getDownloadURL().subscribe(image => {
            prod.image = image;
          });
        });
    });
  }
  checkout() {
    this.modalService.open(this.content).result.then((result) => {
      console.log(result);
    }, (reason) => {
      console.log(reason);
    });
    // this.emailSrv.sendEmail(this.cartItems)
    // .subscribe(res => {
    //   console.log(res)
    // });
  }
}
