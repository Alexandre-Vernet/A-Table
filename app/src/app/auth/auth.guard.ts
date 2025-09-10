import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, of, switchMap } from 'rxjs';
import { AlertService } from '../services/alert.service';
import { UserService } from './user.service';

export const authGuard = (): Observable<boolean> => {
    const userService = inject(UserService);
    const alertService = inject(AlertService);
    const router = inject(Router);

    return userService.signInWithAccessToken()
        .pipe(
            switchMap(user => {
                if (!user) {
                    return handleError(router, alertService);
                }
                return of(true);
            }),
            catchError(() => {
                return handleError(router, alertService);
            })
        );
};

const handleError = (router: Router, alertService: AlertService): Observable<boolean> => {
    alertService.alert$.next({
        severity: 'error',
        message: 'Vous devez être connecté pour accéder à cette page'
    });
    router.navigate(['/auth/login']);
    return of(false);
};
