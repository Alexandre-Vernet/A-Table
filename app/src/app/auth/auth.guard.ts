import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, of, switchMap } from 'rxjs';
import { AlertService } from '../services/alert.service';
import { UserService } from '../services/user.service';

export const authGuard = (): Observable<boolean> => {
    const userService = inject(UserService);
    const alertService = inject(AlertService);
    const router = inject(Router);

    return userService.getCurrentUser()
        .pipe(
            switchMap(user => {
                if (!user) {
                    return handleError(router, alertService);
                }
                return of(true);
            }),
            catchError((e) => {
                console.log(e)
                return handleError(router, alertService);
            })
        );
};

const handleError = (router: Router, alertService: AlertService): Observable<boolean> => {
    alertService.showError('Vous devez être connecté pour accéder à cette page');
    router.navigate(['/auth/login']);
    return of(false);
};
