import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { NgClass } from '@angular/common';
import { Message } from 'primeng/message';
import { ForgotPasswordComponent } from '../forgot-password/forgot-password.component';
import { User } from '../../dto/User';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['../auth.component.scss'],
    imports: [
        ReactiveFormsModule,
        RouterLink,
        NgClass,
        Message,
        ForgotPasswordComponent
    ]
})
export class LoginComponent {

    formSignIn = new FormGroup({
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required, Validators.minLength(6)])
    });

    showDialogForgotPassword: boolean;

    constructor(
        private readonly authService: AuthService,
        private router: Router
    ) {
    }

    signIn() {
        const {
            email,
            password
        } = this.formSignIn.value;

        const user: User = {
            email,
            password
        };

        this.authService.login(user)
            .subscribe({
                next: () => this.router.navigateByUrl('/'),
                error: () => this.formSignIn.setErrors({
                    invalidCredential: 'Email ou mot de passe invalide'
                })
            });
    }
}
