import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  signedIn$: BehaviorSubject<boolean>

  constructor(private authService: AuthService) {
    this.signedIn$ = this.authService.signedIn$
  }

  ngOnInit() {
    console.log(this.signedIn$)
    this.authService.checkIfSignedIn().subscribe(() => { })

   /*  setTimeout(() => {
      this.authService.signOut().subscribe(() => { })
    }, 5000); */
  }



}
