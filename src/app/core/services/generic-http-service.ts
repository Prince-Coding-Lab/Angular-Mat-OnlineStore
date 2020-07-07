import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { ServiceResult } from './service-result';
import { catchError, finalize, map } from 'rxjs/operators';
import { RequestFields } from './request-fields.model';

@Injectable({
    providedIn: 'root'
})
export class GenericHttpService {
    constructor(private http: HttpClient) { }

    get<T>(url: string, options?: RequestFields, showLoader?: boolean): Observable<ServiceResult<T>> {
        return this.execauteHttpRequest<T>(url, 'Get', showLoader, options);
    }
    put<T>(url: string, body: any, options?: RequestFields, showLoader?: boolean): Observable<ServiceResult<T>> {
        return this.execauteHttpRequest<T>(url, 'Put', showLoader, options, body);
    }
    post<T>(url: string, body: any, options?: RequestFields, showLoader?: boolean): Observable<ServiceResult<T>> {
        return this.execauteHttpRequest<T>(url, 'Post', showLoader, options, body);
    }
    delete<T>(url: string, options?: RequestFields, showLoader?: boolean): Observable<ServiceResult<T>> {
        return this.execauteHttpRequest<T>(url, 'delete', showLoader, options);
    }
    private setRequestHeaders(requestOptions: RequestFields) {
        let options = requestOptions;
        if (options === undefined) { 
            options = new RequestFields();
        }
        if(options.headers === undefined){
            options.headers = new HttpHeaders();
        }
        options.headers = options.headers.append("Content-Type",'application/json');
        return options;

    }
    private execauteHttpRequest<T>(url: string, method: string, showLoader: any, options?: RequestFields, body?: any):
        Observable<ServiceResult<T>> {
        if (showLoader !== false) {
            // this.showLoader();
        }
        options = this.setRequestHeaders(options);
        if (body != null) {

            options.body = JSON.stringify(body);
        }
        return this.http.request(method, url, options).pipe(
            map((response: HttpResponse<any>) => {
                const serviceResponse = this.mapServiceResponse<T>(response);
                return serviceResponse;
                //logging file based 

            }),
            catchError(this.handleError)
            // finalize(()=>{
            //    // do something here
            // })
        );
    }
    private handleError(error: HttpErrorResponse) {
        console.error('server error:', error);
        if (error.error instanceof Error) {
            const errMessage = error.error.message;
            return Observable.throw(errMessage);
            // return Observable.throw(err.text() || 'backend server error');
        }
        return Observable.throw(error || 'Server error');
    }
    private mapServiceResponse<T>(serviceData: any): ServiceResult<T> {
        if (!serviceData) {
            return new ServiceResult<T>();
        }
        const serviceResult = new ServiceResult<T>(serviceData.model || serviceData, serviceData.meta);
        if (serviceData.hasError) {
            serviceResult.hasError = serviceData.HasError;
        }
        serviceResult.message = serviceData.message;
        return serviceResult;
    }
}