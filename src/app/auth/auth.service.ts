import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


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

  constructor(private http: HttpClient) { }


  usernameAvailable(username: string) {
    return this.http.post<UserNameAvailableResponse>(this.url + '/auth/username', {
      username: username
    })
  }

  signup(credentials: SignUpCredentials) {
    return this.http.post<SignUpResponse>(this.url + '/auth/signup', credentials)
  }
}
