import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AngularFireStorage } from 'angularfire2/storage';
import { PromosService } from '../services/promos.service';
import { Promo } from '../models/promo.interface';

@Component({
  selector: 'app-promo-config-item',
  templateUrl: './promo-config-item.component.html',
  styleUrls: ['./promo-config-item.component.scss']
})
export class PromoConfigItemComponent implements OnInit {
  @Output() edit = new EventEmitter();
  @Input() promo: Promo;
  constructor(
    private storage: AngularFireStorage,
    private promoSrv: PromosService
  ) {}

  ngOnInit() {
    const ref = this.storage.ref(this.promo.image);
    ref.getDownloadURL().subscribe(image => {
       this.promo.image = image;
    });
  }
  editItem() {
    this.edit.emit();
  }
  delete() {
    this.promoSrv.delete(this.promo.id);
  }
}
