import { throwError as observableThrowError,  Observable ,  BehaviorSubject } from 'rxjs';
import { take, filter, catchError, switchMap, finalize } from 'rxjs/operators';
import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpSentEvent, HttpHeaderResponse, HttpProgressEvent, HttpResponse, HttpUserEvent, HttpErrorResponse } from '@angular/common/http';
// import { AuthService } from './auth.service';

@Injectable()
export class RequestInterceptorService implements HttpInterceptor {
    // isRefreshingToken: boolean = false;
    // tokenSubject: BehaviorSubject<string> = new BehaviorSubject<string>(null);

    constructor (private injector: Injector) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpSentEvent | HttpHeaderResponse | HttpProgressEvent | HttpResponse<any> | HttpUserEvent<any>> {
        let token = window.localStorage.getItem('token');
        if (token) {
            request = request.clone({
                setHeaders: {
                    Authorization: 'Bearer ' + token
                }
            });
        }
        return next.handle(request).pipe(
            catchError(error => {
                console.log( JSON.stringify(error) );
                if (error instanceof HttpErrorResponse) {
                    switch ((<HttpErrorResponse>error).status) {
                        case 400:
                            return this.handle400Error(error);
                        case 401:
                          return observableThrowError(error); //return this.handle401Error(request, next);
                        default:
                            return observableThrowError(error);
                    }
                } else {
                    return observableThrowError(error);
                }
            }));
    }

    handle400Error(error) {
        if (error && error.status === 400 && error.error && error.error.error === 'invalid_grant') {
            return this.logoutUser(); // Если мы получим 400 и сообщение об ошибке 'invalid_grant', токен больше не действителен, поэтому выйдите из системы.
        }
        return observableThrowError(error);
    }


    // addToken(request: HttpRequest<any>, token: string): HttpRequest<any> {
    //   return request.clone({
    //     setHeaders: {
    //       Authorization: 'Bearer ' + token
    //     }
    //   });
    // }
    //
    // handle401Error(req: HttpRequest<any>, next: HttpHandler) {
    //     if (!this.isRefreshingToken) {
    //         this.isRefreshingToken = true;
    //         const authService = this.injector.get(AuthService);
    //
    //         this.tokenSubject.next(null); // Выполните сброс здесь, чтобы следующие запросы ожидали, пока токен не вернется из вызова refreshToken.
    //         return authService.refreshToken().pipe(
    //             switchMap((newToken: string) => {
    //                 if (newToken) {
    //                     this.tokenSubject.next(newToken);
    //                     return next.handle(this.addToken(this.getNewRequest(req), newToken));
    //                 }
    //                 return this.logoutUser(); // Если мы не получим новый токен, у нас возникнут проблемы, поэтому выйдите из системы.
    //             }),
    //             catchError(error => {
    //                 // If there is an exception calling 'refreshToken', bad news so logout.
    //                 return this.logoutUser();
    //             }),
    //             finalize(() => {
    //                 this.isRefreshingToken = false;
    //             }),);
    //     }
    // }
    //
    // // Этот метод только здесь, поэтому пример работает. Не включайте в свой код, просто используйте 'req' вместо this.getNewRequest(req)'.
    // getNewRequest(req: HttpRequest<any>): HttpRequest<any> {
    //     if (req.url.indexOf('getData') > 0) {
    //         return new HttpRequest('GET', 'http://private-4002d-testerrorresponses.apiary-mock.com/getData');
    //         // return new HttpRequest('GET', 'https://192.168.1.124:9000/api/v1/receipt-send-audits?page=0&size=18&sort=sendDate,desc');
    //     }
    //
    //     return new HttpRequest('GET', 'http://private-4002d-testerrorresponses.apiary-mock.com/getLookup');
    //     // return new HttpRequest('GET', 'https://192.168.1.124:9000/api/v1/receipt-send-audits?page=0&size=18&sort=sendDate,desc');
    // }

    logoutUser() {
        return observableThrowError(""); // Маршрут к странице входа (реализация до вас)
    }
}
