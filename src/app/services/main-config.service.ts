import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable()
export class MainConfigService {

  constructor(private db: AngularFireDatabase) { }

  getConfigs() {
    return this.db.list('/config').valueChanges();
  }
  getPromos(): Observable<any> {
    return this.db.list('/promos').valueChanges();
  }
}
