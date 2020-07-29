import { HttpErrorResponse } from '@angular/common/http';

export class ServiceResult<T>
{
    model: T;
    hasError: boolean;
    status: number;
    message: string;
    errorMessage: string;

    constructor(data?: T, meta?: HttpErrorResponse) {
        this.model = data;
    }
}