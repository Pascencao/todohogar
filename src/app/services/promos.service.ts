import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase/app';

@Injectable()
export class PromosService {
  constructor(private db: AngularFireDatabase) { }

  getPromos() {
    return this.db.list('/promos').valueChanges();
  }
  getPromoById() {
    return this.db.object('/promos/2').valueChanges();
  }
  addPromo(promo) {
    console.log(promo);
    return this.db.list('/promos').push(promo);
  }
  uploadImage(upload: any) {
    const storage = firebase.storage().ref();
    return storage.child(`/uploads/${upload.file.name}`).put(upload.file);
  }
}
