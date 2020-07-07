import {HttpHeaders,HttpParams} from '@angular/common/http';
export class RequestFields
{
    headers?:HttpHeaders;
    observe?:any;
    params?:HttpParams;
    responseType?:any = 'json';
    body?:any;
}