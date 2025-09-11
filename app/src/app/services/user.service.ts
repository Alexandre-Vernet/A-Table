import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { User } from '../dto/User';
import { BehaviorSubject, of, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    private userSubject = new BehaviorSubject<User>(null);
    user$ = this.userSubject.asObservable();

    userUrl = environment.userUrl();

    constructor(
        private readonly http: HttpClient
    ) {
    }

    signInWithAccessToken() {
        if (localStorage.getItem("token")) {
            return this.http.get<User>(`${ this.userUrl }/me`)
                .pipe(tap(user => this.userSubject.next(user)));
        }
        return of(null);
    }

    getUser(userId: number) {
        return this.http.get<{user: User, recipeCount: number}>(`${ this.userUrl }/${ userId }`);
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
                tap(({ user, accessToken }) => {
                    this.userSubject.next(user);
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
        this.userSubject.next(null);
        localStorage.removeItem('token');
    }
}
