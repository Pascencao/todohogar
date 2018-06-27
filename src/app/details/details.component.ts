import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { ActivatedRoute } from '@angular/router';
import { AngularFireStorage } from 'angularfire2/storage';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  product: {
    id: string,
    title: string,
    description: string,
    price: string,
    image: string,
    discount: number,
    labels: [string],
  };
  loading: Boolean = true;
  constructor(
    private productSrv: ProductsService,
    private route: ActivatedRoute,
    private storage: AngularFireStorage
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.productSrv.getProductById(params.id).subscribe(product => {
        this.product = product;
        const ref = this.storage.ref(this.product.image);
        ref.getDownloadURL().subscribe(image => {
          this.product.image = image;
        });
        this.loading = false;
      });
    });
  }
}
