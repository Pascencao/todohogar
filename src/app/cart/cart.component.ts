import { EmailsSenderService } from '../services/email-sender.service';
import { LocalStorageService } from 'angular-2-local-storage';
import { ProductsService } from '../services/products.service';
import { Component, OnInit, DoCheck, ViewChild } from '@angular/core';
import { Product } from '../models/product.interface';
import { Observable } from 'rxjs/Observable';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import * as _ from 'lodash';
import { AngularFireStorage } from 'angularfire2/storage';
import { MainConfigService } from '../services/main-config.service';

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
    private emailSrv: EmailsSenderService,
    private mainConfigSrv: MainConfigService
  ) {
    this.mainConfigSrv.getConfigs()
      .subscribe((config: any) => {
        this.siteConfig = config;
      });
  }
  isOpen: Boolean = false;
  cart: any[];
  total = 0;
  cartItems: Product[] = new Array();
  siteConfig: any;

  ngOnInit() {
    this.cart = this.localStorage.get<[any]>('cart') || [];
  }
  ngDoCheck() {
    this.cart = this.localStorage.get<[any]>('cart') || [];
  }
  openCart() {
    this.isOpen = !this.isOpen;
    this.getProducts();
  }
  getProducts() {
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
      this.emailSrv.sendEmail(this.cartItems, {
        to: this.siteConfig.email,
        from: result.email,
        name: result.name,
        contact: result.phone,
        company: this.siteConfig.site_name
      }).then(() => {
        this.localStorage.set('cart', []);
        this.isOpen = false;
      });
    });
  }
}
