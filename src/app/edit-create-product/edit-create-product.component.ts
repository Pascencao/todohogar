import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
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
  labels: string;
  filePath: string;
  title: string;
  description: string;
  price: string;
  image: string;
  uploadPercent: Observable<number>;
  downloadURL: Observable<any>;
  labelsList = [];

  constructor(private storage: AngularFireStorage, private prodSrv: ProductsService) { }

  ngOnInit() {
  }
  addLabel() {
    this.labelsList = this.labelsList || [];
    this.labelsList.push(this.labels);
    this.labels = '';
  }
  submit() {

    this.prodSrv.addProduct({
      title: this.title,
      description: this.description,
      price: this.price,
      image: this.filePath,
      labels: this.labelsList
    });

    this.saved.emit();
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
}
