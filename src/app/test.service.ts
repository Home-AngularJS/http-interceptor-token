import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class TestService {
    constructor (private http: HttpClient) {}

    getData() {
        // return this.http.get<{status}>('http://private-4002d-testerrorresponses.apiary-mock.com/getDataError401');
        return this.http.get<{status}>('https://192.168.1.124:9000/api/v1/receipt-send-audits?page=0&size=18&sort=sendDate,desc');
    }

    // getLookup() {
    //     return this.http.get<{status}>('http://private-4002d-testerrorresponses.apiary-mock.com/getLookupError401');
    // }
}
