// import { HttpClient } from '@angular/common/http';
// import { of as observableOf,  Observable } from 'rxjs';
// import { delay } from 'rxjs/operators';
// import { Injectable } from '@angular/core';
//
// @Injectable()
// export class AuthService {
//     // Предполагая, что это будет как-то кэшировано при входе в систему.
//     public authTokenStale: string = 'stale_auth_token';
//     public authTokenNew: string = 'new_auth_token';
//     public currentToken: string;
//
//     constructor(private http: HttpClient) {
//         this.currentToken = this.authTokenStale;
//     }
//
//     // getAuthToken() {
//     //     return this.currentToken;
//     // }
//
//     refreshToken(): Observable<string> {
//         //Вызов, который идет здесь, будет использовать существующий токен обновления для вызова метод на сервере oAuth (обычно называемый refreshToken) для получения нового токен авторизации для вызовов API.
//         this.currentToken = this.authTokenNew;
//
//         this.http.get('http://private-4002d-testerrorresponses.apiary-mock.com/getData'); // Просто чтобы HttpClient не трясло дерево.
//
//         return observableOf(this.authTokenNew).pipe(delay(200));
//     }
// }
