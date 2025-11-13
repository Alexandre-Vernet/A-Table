import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgClass } from '@angular/common';
import { Button } from 'primeng/button';
import { Dialog } from 'primeng/dialog';
import { FloatLabel } from 'primeng/floatlabel';
import { Message } from 'primeng/message';
import { Password } from 'primeng/password';
import { User } from '../../dto/User';
import { AlertService } from '../../services/alert.service';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-reset-password',
    templateUrl: './reset-password.component.html',
    styleUrls: ['./reset-password.component.scss'],
    imports: [
        ReactiveFormsModule,
        NgClass,
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
        private readonly authService: AuthService,
        private readonly router: Router,
        private readonly activatedRoute: ActivatedRoute,
        private readonly alertService: AlertService
    ) {
    }

    ngOnInit() {
        const token = this.activatedRoute.snapshot.queryParamMap.get('token');
        this.authService.verifyToken(token)
            .subscribe({
                next: (user) => this.user = user,
                error: () => {
                    this.alertService.showError('Le lien de réinitialisation du mot de passe est invalide ou a expiré.');
                    this.redirectToSignIn();
                }
            });
    }

    redirectToSignIn() {
        this.router.navigate(['/auth/login']);
    }

    submitForm() {
        if (!this.formResetPassword.valid) {
            return;
        }
        this.isLoading = true;
        const { newPassword, confirmPassword } = this.formResetPassword.value;
        if (newPassword !== confirmPassword) {
            this.formResetPassword.setErrors({ error: 'Passwords do not match' });
            return;
        }
        this.resetPassword();
    }

    resetPassword() {
        const userId = this.user.id;
        const password = this.formResetPassword.controls.newPassword.value;

        this.authService.updatePassword(userId, password)
            .subscribe({
                next: () => {
                    this.alertService.showSuccess('Votre mot de passe a bien été changé')
                    this.formResetPassword.reset();
                    this.router.navigate(['/auth/login']);
                },
                error: (err) => {
                    this.formResetPassword.setErrors({ error: err.error.message ?? 'Une erreur s\'est produite' });
                    this.isLoading = false;
                }
            });
    }
}
