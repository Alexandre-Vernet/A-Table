import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgClass, NgIf } from '@angular/common';
import { Button } from 'primeng/button';
import { Dialog } from 'primeng/dialog';
import { FloatLabel } from 'primeng/floatlabel';
import { Message } from 'primeng/message';
import { Password } from 'primeng/password';
import { User } from '../../dto/User';
import { UserService } from '../user.service';

@Component({
    selector: 'app-reset-password',
    templateUrl: './reset-password.component.html',
    styleUrls: ['./reset-password.component.scss'],
    imports: [
        ReactiveFormsModule,
        NgClass,
        NgIf,
        Button,
        Dialog,
        FloatLabel,
        Message,
        Password
    ],
    standalone: true
})
export class ResetPasswordComponent implements OnInit {
    formResetPassword = new FormGroup({
        newPassword: new FormControl('', [Validators.required, Validators.minLength(6)]),
        confirmPassword: new FormControl('', [Validators.required, Validators.minLength(6)])
    });

    user: User;

    isLoading = false;

    constructor(
        private readonly userService: UserService,
        private readonly router: Router,
        private readonly activatedRoute: ActivatedRoute
    ) {
    }

    ngOnInit() {
        const token = this.activatedRoute.snapshot.queryParamMap.get('token');
        this.verifyToken(token);
    }

    private verifyToken(token: string) {
        this.userService.verifyToken(token)
            .subscribe({
                next: (user) => this.user = user,
                error: () => {
                    // TODO Add pop-up : invalid token
                    this.redirectToSignIn();
                }
            });
    }

    redirectToSignIn() {
        this.router.navigate(['/auth/login']);
    }

    submitForm() {
        if (this.formResetPassword.valid) {
            this.isLoading = true;
            const { newPassword, confirmPassword } = this.formResetPassword.value;
            if (newPassword !== confirmPassword) {
                this.formResetPassword.setErrors({ error: 'Passwords do not match' });
                return;
            }
            this.resetPassword();
        }
        return;
    }

    resetPassword() {
        const userId = this.user.id;
        const password = this.formResetPassword.controls.newPassword.value;

        this.userService.updatePassword(userId, password)
            .subscribe({
                next: () => {
                    this.formResetPassword.reset();
                    this.router.navigate(['/']);
                },
                error: (err) => {
                    this.formResetPassword.setErrors({ error: err.error.message ?? 'Une erreur s\'est produite' });
                    this.isLoading = false;
                }
            });
    }
}
