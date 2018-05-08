import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-promo-config-item',
  templateUrl: './promo-config-item.component.html',
  styleUrls: ['./promo-config-item.component.css']
})
export class PromoConfigItemComponent implements OnInit {
  @Input() promo: any;
  constructor() { }

  ngOnInit() {
  }

}
