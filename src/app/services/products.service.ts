import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase } from 'angularfire2/database'; 

@Injectable()
export class ProductsService {

  constructor(private db: AngularFireDatabase) { }
  getProducts(): Observable<any[]> {
    return this.db.list('/products').valueChanges();
  }
  addProduct(prod) {
    return this.db.list('/products').push(prod);
  }
  updateProduct(prod) {
    return this.db.object(`/products/${prod.id}`).update(prod);
  }
}
