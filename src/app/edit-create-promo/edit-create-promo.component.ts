import { Component, OnInit, ViewChild, Output, EventEmitter, Input } from '@angular/core';
import { PromosService } from '../services/promos.service';
import { AngularFireStorage } from 'angularfire2/storage';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-edit-create-promo',
  templateUrl: './edit-create-promo.component.html',
  styleUrls: ['./edit-create-promo.component.scss']
})
export class EditCreatePromoComponent implements OnInit {
  @ViewChild('fileInput') fileInput;
  @Output() saved = new EventEmitter();
  @Output() cancelEv = new EventEmitter();
  @Input() promo: {
    id: string,
    title: string,
    description: string,
    price: string,
    image: string
  };
  uploadPercent: Observable<number>;
  downloadURL: Observable<any>;
  title: string;
  description: string;
  price: string;
  filePath: string;
  image: string;
  isEditing: boolean;

  constructor(private promoSrv: PromosService, private storage: AngularFireStorage) { }

  ngOnInit() {
    this.isEditing = !!(this.promo && this.promo.id);
    if (this.isEditing) {
      this.filePath = this.promo.image;
      this.title = this.promo.title;
      this.description = this.promo.description;
      this.price = this.promo.price;
    }
  }
  submit() {
    // do stuff w/my uploaded file
    if (this.isEditing) {
      this.promoSrv.updatePromo({
        id: this.promo.id,
        title: this.title,
        description: this.description,
        price: this.price || null,
        image: this.promo.image
      });
    } else {

      this.promoSrv.addPromo({
        title: this.title,
        description: this.description,
        price: this.price || null,
        image: this.filePath,
      });
    }
    this.saved.emit();
  }
  cancel() {
    this.cancelEv.emit();
  }
  getImage() {
    const ref = this.storage.ref(this.promo.image);
    ref.getDownloadURL().subscribe(image => {
      this.filePath = image;
    });
  }
  upload(event) {
    const file = event.target.files[0];
    this.filePath = `promo/images/${file.name}`;
    const task = this.storage.upload(this.filePath, file);
    this.downloadURL = task.downloadURL();
  }
}
