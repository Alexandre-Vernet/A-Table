import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { User } from '../dto/User';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private userSubject = new BehaviorSubject<User>(null);
    user$ = this.userSubject.asObservable();

    authUrl = environment.authUrl();
    error = '';

    constructor(
        private http: HttpClient
    ) {
    }

    signIn(user: User): Observable<{ user: User, accessToken: string }> {
        return this.http.post<{ user: User, accessToken: string }>(`${ this.authUrl }/sign-in`, user)
            .pipe(
                tap(({ user, accessToken }) => {
                    this.userSubject.next(user);
                    localStorage.setItem('access-token', accessToken);
                })
            );
    }

    signUp(user: User): Observable<{ accessToken: string, user: User }> {
        return this.http.post<{ accessToken: string, user: User }>(`${ this.authUrl }/sign-up`, user)
            .pipe(
                tap(({ accessToken }) => localStorage.setItem('access-token', accessToken))
            );
    }

    signInWithAccessToken(): Observable<{ user: User, accessToken: string }> {
        const accessToken = localStorage.getItem('access-token');
        return this.http.post<{
            user: User,
            accessToken: string
        }>(`${ this.authUrl }/sign-in-with-access-token`, { accessToken })
            .pipe(
                tap(({ user, accessToken }) => {
                    this.userSubject.next(user);
                    localStorage.setItem('access-token', accessToken);
                })
            );
    }

    updateUser(user: User) {
        return this.http.put<User>(`${ this.authUrl }`, { user });
    }

    sendEmailForgotPassword(email: string) {
        return this.http.post<{ linkResetPassword: string }>(`${ this.authUrl }/send-email-reset-password`, { email });
    }

    updatePassword(userId: number, password: string) {
        return this.http.put<{ user: User, accessToken: string }>(`${ this.authUrl }/reset-password/${ userId }`, { password })
            .pipe(
                tap(({ user, accessToken }) => {
                    this.userSubject.next(user);
                    localStorage.setItem('access-token', accessToken);
                })
            );
    }

    verifyToken(token: string) {
        return this.http.post<User>(`${ this.authUrl }/verify-token`, { token });
    }

    deleteAccount() {
        return this.http.delete<void>(`${ this.authUrl }`);
    }

    signOut() {
        this.userSubject.next(null);
        localStorage.removeItem('access-token');
    }
}
