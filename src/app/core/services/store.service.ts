import { Injectable, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '../../models/store';
import { ServiceResult } from './service-result';
import { GenericHttpService } from './generic-http-service';

@Injectable({
    providedIn: 'root'
})
export class StoreService {
    baseUrl = 'https://localhost:44349';
    authUrl = this.baseUrl + '/api/store';
    isAuthenticated = false;
    redirectUrl: string;
    @Output() authChanged: EventEmitter<boolean> = new EventEmitter<boolean>();

    constructor(private http: GenericHttpService) { }

    private userAuthChanged(status: boolean) {
        this.authChanged.emit(status); // Raise changed event
    }
    addStore(store: Store): Observable<ServiceResult<Store>> {
        return this.http.post<Store>(this.authUrl, store)
    }
    updateStore(user: Store, id: number): Observable<ServiceResult<Store>> {
        return this.http.put<Store>(this.authUrl + '/' + id, user)
    }
    getStore(id: number): Observable<ServiceResult<Store>> {
        return this.http.get<Store>(this.authUrl + '/getbyid/' + id);
    }
    getStores(): Observable<ServiceResult<Store>> {
        return this.http.get<Store>(this.authUrl)
    }
    deleteStore(id: number): Observable<ServiceResult<Store>> {
        return this.http.delete<Store>(this.authUrl + '/' + id);
    }
}