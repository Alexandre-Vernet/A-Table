import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { UserService } from '../../services/user.service';
import { User } from '../../dto/User';
import { AlertService } from '../../services/alert.service';

@Component({
    selector: 'app-user-profile',
    imports: [],
    templateUrl: './user-profile.html',
    styleUrl: './user-profile.scss'
})
export class UserProfile implements OnInit {

    data: { user: User, recipeCount: number };

    constructor(
        private readonly router: Router,
        private readonly route: ActivatedRoute,
        private readonly userService: UserService,
        private readonly alertService: AlertService
    ) {
    }

    ngOnInit() {
        this.route.params
            .pipe(switchMap((param: { id: number }) => this.userService.getUser(param.id)))
            .subscribe({
                next: (data => this.data = data),
                error: (err => {
                    this.alertService.alert$.next({
                        severity: 'error',
                        message: err?.error?.message ?? 'Impossible d\'accéder à cette page'
                    });

                    this.router.navigate(['/']);
                })
            });
    }

}
