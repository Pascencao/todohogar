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
    console.log(this.promo);
    if (this.isEditing) {
      this.getImage();
      this.title = this.promo.title;
      this.description = this.promo.description;
      this.price = this.promo.price;
    }
  }
  submit() {
    // do stuff w/my uploaded file
    this.promoSrv.addPromo({
      title: this.title,
      description: this.description,
      price: this.price,
      image: this.filePath,
    });
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
    // observe percentage changes
    this.uploadPercent = task.percentageChanges();
    // get notified when the download URL is available
    this.downloadURL = task.downloadURL();
  }
}
