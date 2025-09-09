import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, of, switchMap } from 'rxjs';
import { AuthService } from './auth.service';
import { AlertService } from '../services/alert.service';

export const authGuard = (): Observable<boolean> => {
    const authService = inject(AuthService);
    const alertService = inject(AlertService);
    const router = inject(Router);

    return authService.signInWithAccessToken()
        .pipe(
            switchMap(({ user }) => {
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
    router.navigate(['/auth/sign-in']);
    return of(false);
};
