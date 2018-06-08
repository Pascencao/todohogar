import { Component, OnInit, Input } from '@angular/core';
import { AngularFireStorage } from 'angularfire2/storage';

@Component({
  selector: 'app-product-config-item',
  templateUrl: './product-config-item.component.html',
  styleUrls: ['./product-config-item.component.scss']
})
export class ProductConfigItemComponent implements OnInit {
  @Input() product: {
    name: string,
    title: string,
    description: string,
    price: string,
    image: string,
    labels: [string],
  };
  constructor(private storage: AngularFireStorage) {
  }

  ngOnInit() {
    const ref = this.storage.ref(this.product.image);
    ref.getDownloadURL().subscribe(image => {
      this.product.image = image;
    });
    // console.log(this.promo.image);
  }

}
