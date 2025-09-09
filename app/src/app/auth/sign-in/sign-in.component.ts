import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router, RouterLink } from '@angular/router';
import { NgClass, NgIf } from '@angular/common';
// import { faChevronRight, faLock, faUser } from '@fortawesome/free-solid-svg-icons';
// import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Message } from 'primeng/message';
import { ForgotPasswordComponent } from '../forgot-password/forgot-password.component';
import { Alert } from '../../dto/Alert';
import { User } from '../../dto/User';

@Component({
    selector: 'app-sign-in',
    templateUrl: './sign-in.component.html',
    styleUrls: ['../auth.component.scss'],
    imports: [
        ReactiveFormsModule,
        RouterLink,
        NgIf,
        NgClass,
        Message,
        ForgotPasswordComponent
    ]
})
export class SignInComponent {

    // faIcons = {
    //     faUser,
    //     faLock,
    //     faChevronRight
    // };

    formSignIn = new FormGroup({
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required])
    });


    showDialogForgotPassword: boolean;

    alert: Alert;

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

        this.authService.signIn(user)
            .subscribe({
                next: () => this.router.navigateByUrl('/'),
                error: (err) => this.formSignIn.setErrors({ [err.error.errorCode]: err.error.message })
            });
    }
}
