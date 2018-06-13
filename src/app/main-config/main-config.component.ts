import { Component, OnInit } from '@angular/core';
import { MainConfigService } from '../services/main-config.service';

@Component({
  selector: 'app-main-config',
  templateUrl: './main-config.component.html',
  styleUrls: ['./main-config.component.scss']
})
export class MainConfigComponent implements OnInit {
  configs = {
    theme: '#d2822d',
    site_name: '',
    email: ''
  };

  constructor(
    private mainConfigSrv: MainConfigService,
  ) { }
  ngOnInit() {
    this.getMainCongig();
  }
  getMainCongig() {
    this.mainConfigSrv.getConfigs()
      .subscribe(configs => {
        this.configs.theme = configs.theme || '#d2822d';
        this.configs.site_name = configs.site_name;
        this.configs.email = configs.email;
      });
  }
  saveConfig() {
    this.mainConfigSrv.updateConfigs(this.configs);
  }
}
