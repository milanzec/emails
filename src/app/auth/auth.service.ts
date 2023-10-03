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

interface SignedInResponse {
  authenticated: boolean,
  username: string
}

export interface SignInCredentials {
  username: string,
  password: string
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


  checkIfSignedIn() {
    return this.http.get<SignedInResponse>(this.url + '/auth/signedin')
      .pipe(
        tap(({ authenticated }) => {
          this.signedIn$.next(authenticated)
        })
      )
  }

  signOut() {
    return this.http.post(this.url + '/auth/signout', {})
      .pipe(
        tap(() => this.signedIn$.next(false))
      )
  }

  signin(credentials: SignInCredentials) {
    return this.http.post(this.url + '/auth/signin', credentials)
      .pipe(
        tap(() => {
          this.signedIn$.next(true)
        })
      )
  }


}
