import { Injectable, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { Item } from '../../models/item';
import { ServiceResult } from './service-result';
import { GenericHttpService } from './generic-http-service';

@Injectable({
    providedIn: 'root'
})
export class ItemService {
    baseUrl = 'https://localhost:44349';
    authUrl = this.baseUrl + '/api/item';
    isAuthenticated = false;
    redirectUrl: string;
    @Output() authChanged: EventEmitter<boolean> = new EventEmitter<boolean>();

    constructor(private http: GenericHttpService) { }

    private userAuthChanged(status: boolean) {
        this.authChanged.emit(status); // Raise changed event
    }
    addItem(item: Item): Observable<ServiceResult<Item>> {
        return this.http.post<Item>(this.authUrl, item)
    }
    updateItem(item: Item, id: number): Observable<ServiceResult<Item>> {
        return this.http.put<Item>(this.authUrl + '/' + id, item)
    }
    getItem(id: number): Observable<ServiceResult<Item>> {
        return this.http.get<Item>(this.authUrl + '/getbyid/' + id);
    }
    getItems(): Observable<ServiceResult<Item>> {
        return this.http.get<Item>(this.authUrl)
    }
    deleteItem(id: number): Observable<ServiceResult<Item>> {
        return this.http.delete<Item>(this.authUrl + '/' + id);
    }
}