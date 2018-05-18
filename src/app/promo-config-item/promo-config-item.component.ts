import { Component, OnInit, Input } from '@angular/core';
import { AngularFireStorage } from 'angularfire2/storage';

@Component({
  selector: 'app-promo-config-item',
  templateUrl: './promo-config-item.component.html',
  styleUrls: ['./promo-config-item.component.scss']
})
export class PromoConfigItemComponent implements OnInit {
  @Input() promo: any;
  constructor(private storage: AngularFireStorage) {
  }

  ngOnInit() {
    const ref = this.storage.ref(this.promo.image);
    ref.getDownloadURL().subscribe(image => {
       this.promo.image = image;
    });
    // console.log(this.promo.image);
  }

}
