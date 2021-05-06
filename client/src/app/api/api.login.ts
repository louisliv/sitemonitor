import { EventEmitter, Injectable, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserLogin } from "./../models/user-login.model"
import { User } from "./../models/user.model"
import { environment } from './../../environments/environment';

// this service be call in the appointments page component for back-end communications
@Injectable()
export class ApiLogin{
    @Output() authenticated:EventEmitter<Boolean> = new EventEmitter();

    constructor(private http: HttpClient) { }

    /**
     * @param userLoginObject
     */
    login(userLoginObject: UserLogin) : Observable<User>{
        return this.http.post<User>(`${environment.apiUrl}/auth/login/`, userLoginObject)
    }

    logout(): Observable<{}>{
        return this.http.post<{}>(`${environment.apiUrl}/auth/logout/`, {})
    }
}