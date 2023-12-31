import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService, SignInCredentials } from '../auth.service';



@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {

  authForm = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
      Validators.pattern(/^[a-z0-9]+$/)

    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(20)
    ])
  })

  constructor(private authService: AuthService) { }

  onSubmit() {
    if (this.authForm.invalid) {
      console.log('something bad')
      return
    }

    this.authService.signin(this.authForm.value as SignInCredentials).subscribe(() => {

    })
  }


}
