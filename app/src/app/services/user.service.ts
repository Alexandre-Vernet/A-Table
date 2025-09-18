import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { User } from '../dto/User';
import { of, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AlertService } from './alert.service';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    userUrl = environment.userUrl();

    constructor(
        private readonly http: HttpClient,
        private readonly alertService: AlertService,
    ) {
    }

    getCurrentUser() {
        if (localStorage.getItem('token')) {
            return this.http.get<User>(`${ this.userUrl }/me`)
                .pipe(
                    tap(user => user ? this.alertService.clear() : null),
                );
        }
        return of(null);
    }

    getUser(userId: number) {
        return this.http.get<User>(`${ this.userUrl }/${ userId }`)
    }

    updateUser(user: User) {
        return this.http.put<User>(`${ this.userUrl }`, { user });
    }

    sendEmailForgotPassword(email: string) {
        return this.http.post<{ linkResetPassword: string }>(`${ this.userUrl }/send-email-reset-password`, { email });
    }

    updatePassword(userId: number, password: string) {
        return this.http.put<{
            user: User,
            accessToken: string
        }>(`${ this.userUrl }/reset-password/${ userId }`, { password })
            .pipe(
                tap(({ accessToken }) => {
                    localStorage.setItem('token', accessToken);
                })
            );
    }

    verifyToken(token: string) {
        return this.http.post<User>(`${ this.userUrl }/verify-token`, { token });
    }

    deleteAccount() {
        return this.http.delete<void>(`${ this.userUrl }`);
    }


    signOut() {
        localStorage.removeItem('token');
    }
}
