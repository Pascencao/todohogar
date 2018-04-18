import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase } from 'angularfire2/database'; 

@Injectable()
export class ProductsService {

  constructor(private db: AngularFireDatabase) { }
  getPromos(): Observable<any[]> {
    return this.db.list('/promos').valueChanges();
    
  }
}
