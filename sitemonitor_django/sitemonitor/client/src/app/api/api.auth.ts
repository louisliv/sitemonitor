import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from "./../models/user.model"
import { environment } from './../../environments/environment';

// this service be call in the appointments page component for back-end communications
@Injectable()
export class ApiAuth{

    constructor(private http: HttpClient) { }

    isAuthenticated(): Observable<User>{
        return this.http.get<User>(`${environment.apiUrl}/auth/is_authenticated/`)
    }
}