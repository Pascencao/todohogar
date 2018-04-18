import { Component, OnInit } from '@angular/core';
import { MainConfigService } from '../services/main-config.service';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.css']
})
export class ConfigComponent implements OnInit {

  constructor(
    private mainConfigSrv: MainConfigService
  ) { }

  ngDoCheck(){
  }
  ngOnInit() {
    this.getConfig();
  }

  getConfig(){
    return this.mainConfigSrv.getConfigs().subscribe(res =>{
      console.log(res);
    });
  }
}
