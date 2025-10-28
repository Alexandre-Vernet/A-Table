import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { NgClass } from '@angular/common';
import { Message } from 'primeng/message';
import { User } from '../../dto/User';
import { switchMap } from 'rxjs';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['../auth.component.scss'],
    imports: [
        ReactiveFormsModule,
        RouterLink,
        NgClass,
        Message
    ]
})
export class RegisterComponent {

    formSignUp = new FormGroup({
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required, Validators.minLength(6)]),
        confirmPassword: new FormControl('', [Validators.required, Validators.minLength(6)]),
        firstName: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
        lastName: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
    });

    constructor(
        private readonly authService: AuthService,
        private router: Router
    ) {
    }

    signUp() {
        const {
            email,
            password,
            confirmPassword,
            firstName,
            lastName
        } = this.formSignUp.value;

        if (password !== confirmPassword) {
            this.formSignUp.setErrors({ passwordNotMatch: true });
            return;
        }

        const user: User = {
            email,
            password,
            confirmPassword,
            firstName,
            lastName
        };
        this.authService.register(user)
            .pipe(
                switchMap(() => this.authService.login(user))
            )
            .subscribe({
                next: () => this.router.navigateByUrl('/'),
                error: (err) => this.formSignUp.setErrors({
                        error: err?.error?.message ?? 'Une erreur s\'est produite'
                    })
            });
    }
}
