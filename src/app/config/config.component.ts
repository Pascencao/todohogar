import { Component, OnInit } from '@angular/core';
import { MainConfigService } from '../services/main-config.service';
import { AngularFireStorage } from 'angularfire2/storage';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.css']
})
export class ConfigComponent implements OnInit {
  promos: [any];
  addNew: Boolean = false;

  constructor(
    private mainConfigSrv: MainConfigService,
    private storage: AngularFireStorage
  ) { }

  // ngDoCheck(){
  // }
  ngOnInit() {
    this.getConfig();
    this.getPromos();
  }
  promoSaved() {
    this.addNew = false;
    this.getConfig();
  }
  getConfig() {
    return this.mainConfigSrv.getConfigs().subscribe();
  }
  getPromos() {
    return this.mainConfigSrv.getPromos()
      .map((promos: any) => {
        promos.map(promo => {
          const ref = this.storage.ref(promo.image);
          promo.image = ref.getDownloadURL();
          return promo;
        });
        console.log(promos);
        return promos;
      }).subscribe(promos => {
      this.promos = promos;
      this.addNew = !promos.length;
    });
  }
}
