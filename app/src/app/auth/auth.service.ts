import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { User } from '../dto/User';
import { AuthRequest } from '../dto/AuthRequest';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    authUrl = environment.authUrl();
    error = '';

    constructor(
        private readonly http: HttpClient
    ) {
    }

    login(user: User) {
        return this.http.post<AuthRequest>(`${ this.authUrl }/login`, user)
            .pipe(
                tap(auth => {
                    localStorage.setItem('token', auth.token);
                })
            );
    }

    register(user: User) {
        return this.http.post<User>(`${ this.authUrl }/register`, user);
    }
}
