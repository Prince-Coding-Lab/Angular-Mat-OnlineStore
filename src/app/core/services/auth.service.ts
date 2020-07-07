import { Injectable, Output, EventEmitter, Inject, Directive } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { User } from '../../models/user';
// import { IUserLogin } from '../../shared/interfaces';
import { UtilitiesService } from './utilities.service';
import { ServiceResult } from './service-result';
import { GenericHttpService } from './generic-http-service';

@Injectable({
    providedIn: 'root'
  })
export class AuthService {
    baseUrl = 'https://localhost:44349';
    authUrl = this.baseUrl + '/api/auth';
    isAuthenticated = false;
    redirectUrl: string;
    @Output() authChanged: EventEmitter<boolean> = new EventEmitter<boolean>();

    constructor(private http: GenericHttpService) { }

    private userAuthChanged(status: boolean) {
        this.authChanged.emit(status); // Raise changed event
    }
    register(user: User): Observable<ServiceResult<User>> {
        return this.http.post<User>(this.authUrl + '/register', user)
        // .pipe(
        //     map((serviceResult: ServiceResult<User>) => {
        //         return serviceResult;

        //     }));
    }
    login(user:User): Observable<ServiceResult<User>> {
        return this.http.post<User>(this.authUrl + '/login', user);
    }
    // login(userLogin: IUserLogin): Observable<boolean> {
    //     return this.http.post<boolean>(this.authUrl + '/login', userLogin)
    //         .pipe(
    //             map(loggedIn => {
    //                 this.isAuthenticated = loggedIn;
    //                 this.userAuthChanged(loggedIn);
    //                 return loggedIn;
    //             }),
    //             catchError(this.handleError)
    //         );
    // }

    // logout(): Observable<boolean> {
    //     return this.http.post<boolean>(this.authUrl + '/logout', null)
    //         .pipe(
    //             map(loggedOut => {
    //                 this.isAuthenticated = !loggedOut;
    //                 this.userAuthChanged(!loggedOut); // Return loggedIn status
    //                 return loggedOut;
    //             }),
    //             catchError(this.handleError)
    //         );
    // }

    private handleError(error: HttpErrorResponse) {
        console.error('server error:', error);
        if (error.error instanceof Error) {
            const errMessage = error.error.message;
            return Observable.throw(errMessage);
            // return Observable.throw(err.text() || 'backend server error');
        }
        return Observable.throw(error || 'Server error');
    }

}