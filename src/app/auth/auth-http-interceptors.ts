
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest, HttpEventType } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap, filter } from 'rxjs/operators';



@Injectable()
export class AuthHttpInterceptors implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        //modify or log existing request
        const modifiedReq = req.clone({
            withCredentials: true
        })
        return next.handle(modifiedReq).pipe(
            filter(val => val.type === HttpEventType.Sent),
            tap(val => console.log('request is sent to server'))
        )
    }
}
