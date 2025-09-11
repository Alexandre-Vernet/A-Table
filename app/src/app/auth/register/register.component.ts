import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router, RouterLink } from '@angular/router';
import { NgClass, NgIf } from '@angular/common';
// import { FaIconComponent } from '@fortawesome/angular-fontawesome';
// import { faChevronRight, faLock, faUser } from '@fortawesome/free-solid-svg-icons';
import { Message } from 'primeng/message';
import { User } from '../../dto/User';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['../auth.component.scss'],
    imports: [
        ReactiveFormsModule,
        RouterLink,
        NgIf,
        NgClass,
        Message
    ]
})
export class RegisterComponent {

    // faIcons = {
    //     faUser: faUser,
    //     faLock: faLock,
    //     faChevronRight: faChevronRight
    // };

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
            this.formSignUp.setErrors({ passwordNotMatch: 'Passwords does not match' });
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
            .subscribe({
                next: () => this.router.navigateByUrl('/'),
                error: (err) => this.formSignUp.setErrors({ [err.error.errorCode]: err.error.message })
            });
    }
}
