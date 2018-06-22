import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable()
export class MainConfigService {

  constructor(private db: AngularFireDatabase) { }

  getConfigs(): Observable<any> {
    return this.db.object('/config').valueChanges();
  }
  getPromos(): Observable<any> {
    return this.db.object('/promos').valueChanges();
  }
  getProducts(): Observable<any> {
    return this.db.object('/products').valueChanges();
  }
  updateConfigs(data) {
    return this.db.object('/config').update(data);
  }
}
