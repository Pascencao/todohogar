import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-product-config-item',
  templateUrl: './product-config-item.component.html',
  styleUrls: ['./product-config-item.component.scss']
})
export class ProductConfigItemComponent implements OnInit {
  @Input() product: {
    name: string,
    description: string,
    price: string,
    image: string,
    labels: [string],
  };
  constructor() { }

  ngOnInit() {
  }

}
