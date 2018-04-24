import { Component, OnInit } from '@angular/core';
import { MainConfigService } from '../services/main-config.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css']
})
export class MainNavComponent implements OnInit {
  site: { site_name: '' };
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
      this.site = config;
    });
  }
  logout() {
    this.auth.signOut();
    this.router.navigate(['index']);
  }
} 
