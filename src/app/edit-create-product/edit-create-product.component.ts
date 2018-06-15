import { Component, OnInit, ViewChild, Output, EventEmitter, Input } from '@angular/core';
import { AngularFireStorage } from 'angularfire2/storage';
import { Observable } from 'rxjs/Observable';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-edit-create-product',
  templateUrl: './edit-create-product.component.html',
  styleUrls: ['./edit-create-product.component.scss']
})
export class EditCreateProductComponent implements OnInit {
  @ViewChild('fileInput') fileInput;
  @Output() saved = new EventEmitter();
  @Output() cancelEv = new EventEmitter();
  @Input() product: {
    id: string,
    name: string,
    title: string,
    description: string,
    discount: string,
    shortDescription: string,
    price: string,
    image: string,
    labels: [string],
  };
  labels: string;
  filePath: string;
  title: string;
  description: string;
  shortDescription: string;
  price: string;
  image: string;
  uploadPercent: Observable<number>;
  downloadURL: Observable<any>;
  labelsList = [];
  discount: String;
  isEditing: Boolean = false;

  constructor(private storage: AngularFireStorage, private prodSrv: ProductsService) { }

  ngOnInit() {
    this.isEditing = !!(this.product && this.product.id);
    if (this.isEditing) {
      this.getImage();
      this.title = this.product.title;
      this.description = this.product.description;
      this.shortDescription = this.product.shortDescription;
      this.price = this.product.price;
      this.discount = this.product.discount;
      this.labelsList = this.product.labels;
    }
  }
  addLabel() {
    this.labelsList = this.labelsList || [];
    this.labelsList.push(this.labels);
    this.labels = '';
  }
  submit() {
    if (this.isEditing) {
      this.prodSrv.updateProduct({
        id: this.product.id,
        title: this.title,
        description: this.description,
        shortDescription: this.shortDescription,
        price: this.price,
        image: this.filePath,
        labels: this.labelsList,
        discount: this.discount
      })
    } else {
      this.prodSrv.addProduct({
        title: this.title,
        description: this.description,
        shortDescription: this.shortDescription,
        price: this.price,
        image: this.filePath,
        labels: this.labelsList,
        discount: this.discount
      });
    }

    this.saved.emit();
  }
  cancel() {
    this.cancelEv.emit();
  }
  upload(event) {
    const file = event.target.files[0];
    this.filePath = `product/images/${file.name}`;
    const task = this.storage.upload(this.filePath, file);
    // observe percentage changes
    this.uploadPercent = task.percentageChanges();
    // get notified when the download URL is available
    this.downloadURL = task.downloadURL();
  }
  getImage() {
    const ref = this.storage.ref(this.product.image);
    ref.getDownloadURL().subscribe(image => {
      this.image = image;
    });
  }
}
