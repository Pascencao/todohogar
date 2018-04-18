import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { MainConfigService } from '../services/main-config.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(
    private productSrv: ProductsService,
    private mainConfigSrv: MainConfigService
  ) { }
  promos: any;
  site: any;
  
  ngOnInit() {
    this.productSrv.getPromos().subscribe(res => {
      this.promos = res;
    });
    this.mainConfigSrv.getConfigs().subscribe((config:any) => {
      this.site = config;
    })
  }

}
