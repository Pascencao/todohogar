import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AngularFireStorage } from 'angularfire2/storage';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-product-config-item',
  templateUrl: './product-config-item.component.html',
  styleUrls: ['./product-config-item.component.scss']
})
export class ProductConfigItemComponent implements OnInit {
  @Output() edit = new EventEmitter();
  @Input() product: {
    id: string,
    name: string,
    title: string,
    description: string,
    shortDescription: string,
    discount: string,
    price: string,
    image: string,
    labels: [string],
  };
  constructor(private storage: AngularFireStorage, private prodSrv: ProductsService) {
  }

  ngOnInit() {

    const ref = this.storage.ref(this.product.image);
    ref.getDownloadURL().subscribe(image => {
      this.product.image = image;
    });
  }
  editItem() {
    this.edit.emit();
  }
  delete() {
    this.prodSrv.delete(this.product.id);
  }
}
