import { Component, OnInit, Input } from '@angular/core';
import { AngularFireStorage } from 'angularfire2/storage';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent implements OnInit {
  @Input() product: {
    name: string,
    id: string,
    title: string,
    description: string,
    price: string,
    image: string,
    discount: number,
    labels: [string],
  };

  constructor(private storage: AngularFireStorage) { }

  ngOnInit() {
    const ref = this.storage.ref(this.product.image);
    ref.getDownloadURL().subscribe(image => {
      this.product.image = image;
    });
  }

}
