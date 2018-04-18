import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private auth: AuthService,
    private router: Router
  ) { }
  username: string;
  password: string;

  ngOnInit() {

  }
  submit(){
    this.auth.emailLogin(this.username, this.password).then(res => {
      console.log(this.auth.authState)
      this.router.navigate(['auth','config']);
    })
  }
}
