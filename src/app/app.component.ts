import { Component } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  //signedIn = false
  signedIn$: BehaviorSubject<any>

  constructor(private authService: AuthService) {
    this.signedIn$ = this.authService.signedIn$
  }

  ngOnInit() {
    this.authService.checkIfSignedIn().subscribe(()=>{})
  }

  /*  ngOnInit() {
 
     this.authService.signedIn$.subscribe((signedIn) => {
       this.signedIn = signedIn
     })
   } */

}
