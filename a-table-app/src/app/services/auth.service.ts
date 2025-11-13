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
                switchMap(() => this.userService.getCurrentUser())
            );
    }

    register(user: User) {
        return this.http.post<User>(`${ this.authUrl }/register`, user);
    }


    sendEmailForgotPassword(email: string) {
        return this.http.post<{ token: string }>(`${ this.authUrl }/send-email-reset-password`, email);
    }

    updatePassword(userId: number, password: string) {
        return this.http.patch(`${ this.authUrl }/reset-password/${ userId }`, password);
    }

    verifyToken(token: string) {
        return this.http.post<User>(`${ this.authUrl }/verify-token`, token);
    }
}
