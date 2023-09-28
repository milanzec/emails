import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators'


interface UserNameAvailableResponse {
  available: boolean
}

export interface SignUpCredentials {
  username: string,
  password: string,
  passwordConfirmation: string
}

interface SignUpResponse {
  username: string
}


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url = 'https://api.angular-email.com'
  signedIn$ = new BehaviorSubject(false)

  constructor(private http: HttpClient) { }


  usernameAvailable(username: string) {
    return this.http.post<UserNameAvailableResponse>(this.url + '/auth/username', {
      username: username
    })
  }

  signup(credentials: SignUpCredentials) {
    return this.http.post<SignUpResponse>(this.url + '/auth/signup', credentials)
      .pipe(
        tap(() => {
          this.signedIn$.next(true)
        })
      )
  }
}
