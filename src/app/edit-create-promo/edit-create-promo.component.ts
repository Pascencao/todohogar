import { Component, OnInit, ViewChild } from '@angular/core';
import { PromosService } from '../services/promos.service';

@Component({
  selector: 'app-edit-create-promo',
  templateUrl: './edit-create-promo.component.html',
  styleUrls: ['./edit-create-promo.component.css']
})
export class EditCreatePromoComponent implements OnInit {
  @ViewChild('fileInput') fileInput;

  title: string;
  description: string;
  price: string;
  constructor(private promoSrv: PromosService) { }

  ngOnInit() {
  }
  submit() {
    const fileBrowser = this.fileInput.nativeElement;
    if (!fileBrowser.files || !fileBrowser.files[0]) {
      return;
    }
    const formData = new FormData();
    formData.append('image', fileBrowser.files[0]);
    // do stuff w/my uploaded file
    this.promoSrv.uploadImage({ file: fileBrowser.files[0]});
    this.promoSrv.addPromo({
      title: this.title,
      description: this.description,
      price: this.price
    });
  }
}
