import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database'; 
import { Observable } from 'rxjs/Observable';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'app';
  coursesObservable: Observable<any[]>;
  username: string;
  password: string;
  constructor(private db: AngularFireDatabase, private auth: AuthService) { }

  ngOnInit() {

    /*  */
  }
  submit(){
    console.log(this.username, this.password)
    this.auth.emailLogin(this.username, this.password).then(res => {
      console.log(this.auth.authState)
      this.coursesObservable = this.getCourses('/courses');
      this.coursesObservable.subscribe(res => {
        console.log(res)
      })
    })
  }
  getCourses(listPath): Observable<any[]> {
    return this.db.list(listPath).valueChanges();
  }

}