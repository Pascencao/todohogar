import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase/app';

@Injectable()
export class PromosService {
  constructor(private db: AngularFireDatabase) { }

  getPromos() {
    return this.db.list('/promos').valueChanges();
  }
  getPromoById(id) {
    return this.db.object(`/promos/${id}`).valueChanges();
  }
  addPromo(promo) {
    return this.db.list('/promos').push(promo);
  }
  uploadImage(upload: any) {
    const storage = firebase.storage().ref();
    return storage.child(`/uploads/${upload.file.name}`).put(upload.file);
  }
  updatePromo(promo) {
    return this.db.object(`/promos/${promo.id}`).update(promo);
  }
  delete(id) {
    return this.db.object(`/promos/${id}`).remove();
  }
}
