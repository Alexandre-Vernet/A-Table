import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { User } from '../dto/User';
import { BehaviorSubject, catchError, of, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AlertService } from './alert.service';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    userUrl = environment.userUrl();

    private user = new BehaviorSubject<User>(null);
    user$ = this.user.asObservable();

    constructor(
        private readonly http: HttpClient,
        private readonly alertService: AlertService,
    ) {
    }

    getCurrentUser() {
        if (!localStorage.getItem('token')) {
            return of(null);
        }

        if (this.user?.value) {
            return of(this.user.value);
        }

        return this.http.get<User>(`${ this.userUrl }/me`)
            .pipe(
                tap(user => {
                    if (user) {
                        this.alertService.clear();
                        this.user.next(user);
                    } else {
                        this.signOut();
                    }
                }),
                catchError(() => {
                    this.signOut();
                    return of(null);
                })
            );
    }

    getUser(userId: number) {
        return this.http.get<User>(`${ this.userUrl }/${ userId }`)
    }

    updateUser(user: User) {
        return this.http.patch<User>(`${ this.userUrl }/`, user);
    }

    deactivateAccount() {
        return this.http.get<void>(`${ this.userUrl }/deactivate`);
    }


    signOut() {
        localStorage.removeItem('token');
        this.user.next(null);
    }

    searchUser(search: string) {
        return this.http.get<User[]>(`${ this.userUrl }/search`, {
            params: { search }
        });
    }
}
