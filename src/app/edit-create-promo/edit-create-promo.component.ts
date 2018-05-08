import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { PromosService } from '../services/promos.service';
import { AngularFireStorage } from 'angularfire2/storage';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-edit-create-promo',
  templateUrl: './edit-create-promo.component.html',
  styleUrls: ['./edit-create-promo.component.css']
})
export class EditCreatePromoComponent implements OnInit {
  @ViewChild('fileInput') fileInput;
  @Output() saved = new EventEmitter();
  uploadPercent: Observable<number>;
  downloadURL: Observable<any>;
  title: string;
  description: string;
  price: string;
  filePath: string;
  constructor(private promoSrv: PromosService, private storage: AngularFireStorage) { }

  ngOnInit() {
  }
  submit() {
    console.log('submitting');
    // do stuff w/my uploaded file
    this.promoSrv.addPromo({
      title: this.title,
      description: this.description,
      price: this.price,
      image: this.filePath
    });
    this.saved.emit();
  }
  upload(event) {
    const file = event.target.files[0];
    this.filePath = `promo/images/${file.name}`;
    const task = this.storage.upload(this.filePath, file);
    // observe percentage changes
    this.uploadPercent = task.percentageChanges();
    // get notified when the download URL is available
    this.downloadURL = task.downloadURL();
  }
}
