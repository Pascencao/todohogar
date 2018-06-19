import { Component, OnInit, DoCheck } from '@angular/core';
import { MainConfigService } from '../services/main-config.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.scss']
})
export class MainNavComponent implements OnInit, DoCheck {
  site: { site_name: String, email: String, theme: String } = { site_name: '', email: '', theme: '#cccccc' };
  isLoggedin: boolean = this.auth.authenticated();

  constructor(
    private mainConfigSrv: MainConfigService,
    private auth: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getConfig();
  }

  ngDoCheck() {
    this.isLoggedin = this.auth.authenticated();
  }

  getConfig(): any {
    this.mainConfigSrv.getConfigs().subscribe((config: any) => {
      console.log(config)
      this.site = config;
      this.site.theme = this.site.theme || '#cccccc';
    });
  }
  logout() {
    this.auth.signOut();
    this.router.navigate(['index']);
  }
}
