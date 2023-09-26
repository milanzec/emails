import { Injectable } from "@angular/core";
import { AuthService } from '../auth.service'
import { AsyncValidator, AbstractControl } from '@angular/forms'
import { map, catchError, of } from "rxjs";



@Injectable({ providedIn: 'root' })
export class UniqueUsername implements AsyncValidator {

    constructor(private authService: AuthService) { }

    validate = (control: AbstractControl): any => {
        const { value } = control
      return  this.authService.usernameAvailable(value).pipe(
            map(response => {
                if (response.available) {
                    return null
                } else {
                    return response
                }
            }),
            catchError((err) => {


                if (err.error.username) {
                    return of({ nonUniqueUsername: true })
                } else {
                    return of({ noConnection: true })
                }
            })
        )

    }
}
