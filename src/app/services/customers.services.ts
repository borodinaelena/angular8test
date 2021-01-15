import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/internal/operators/catchError';
import { of } from 'rxjs/internal/observable/of';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export abstract class CustomersService {

    private url = "https://ballistictest.azurewebsites.net/api";
    constructor(
        protected httpClient: HttpClient,
    ) {
    }

    getList(): Observable<any> {
        return this.httpClient
            .get(
                `${this.url}/customers`
            )
    }

    update(data): Observable<any> {
        return this.httpClient
            .post(
                `${this.url}/customer`,
                {
                    'x-client-id': '12345',
                    'firstcustomer': data,
                    'timestamp': new Date().toISOString()
                },
            )
    }
}