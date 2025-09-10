import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { switchMap, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { User } from '../dto/User';
import { AuthRequest } from '../dto/AuthRequest';
import { UserService } from './user.service';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    authUrl = environment.authUrl();
    error = '';

    constructor(
        private readonly http: HttpClient,
        private readonly userService: UserService
    ) {
    }

    login(user: User) {
        return this.http.post<AuthRequest>(`${ this.authUrl }/login`, user)
            .pipe(
                tap(auth => localStorage.setItem('token', auth.token)),
                switchMap(() => this.userService.signInWithAccessToken())
            );
    }

    register(user: User) {
        return this.http.post<User>(`${ this.authUrl }/register`, user);
    }
}
