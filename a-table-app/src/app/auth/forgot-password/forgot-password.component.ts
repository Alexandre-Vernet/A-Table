import { Component, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Button } from 'primeng/button';
import { Dialog } from 'primeng/dialog';
import { FloatLabel } from 'primeng/floatlabel';
import { InputText } from 'primeng/inputtext';
import { Message } from 'primeng/message';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import emailjs from '@emailjs/browser';
import { environment } from '../../../environments/environment';
import { AlertService } from '../../services/alert.service';
import { filter, map, of, Subject, switchMap, tap } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-forgot-password',
    imports: [CommonModule, Button, Dialog, FloatLabel, InputText, Message, ReactiveFormsModule],
    templateUrl: './forgot-password.component.html',
    styleUrl: './forgot-password.component.scss',
    standalone: true
})
export class ForgotPasswordComponent {

    @Input() showDialogForgotPassword = false;
    @Output() showDialogForgotPasswordChange = new Subject<void>();

    email = new FormControl('', Validators.email);

    isLoading = false;

    constructor(
        private readonly authService: AuthService,
        private readonly alertService: AlertService
    ) {
    }

    resetPassword() {
        const email = this.email.value;

        of(email)
            .pipe(
                map(() => email.trim()),
                filter(() => !!email),
                switchMap(() => this.authService.sendEmailForgotPassword(email)),
                tap(() => this.isLoading = true)
            )
            .subscribe({
                next: ({ token }) => {
                    const url = environment.production ? 'https://a-table.alexandre-vernet.fr/auth/reset-password' : 'http://localhost:4200/auth/reset-password';
                    const fullUrl = url + '?token=' + token;
                    emailjs.send(environment.EMAIL_JS.SERVICE_ID, environment.EMAIL_JS.TEMPLATE_ID, {
                            linkResetPassword: fullUrl,
                            email
                        },
                        environment.EMAIL_JS.PUBLIC_KEY
                    ).then(
                        () => {
                            this.closeModal();
                            this.isLoading = false;
                            this.alertService.showSuccess('Un email vous a été envoyé pour réinitialiser votre mot de passe');
                        },
                        () => {
                            this.isLoading = false;
                            this.alertService.showError('Une erreur s`est produite lors de l`envoi de l`email');
                        }
                    );
                },
                error: (err) => {
                    this.isLoading = false;
                    if (err.error.code === 'USER_DOESNT_EXIST') {
                        this.email.setErrors({
                            EMAIL_NOT_FOUND: true
                        });
                    } else {
                        this.email.setErrors({
                            UNKNOWN_ERROR: true
                        });
                    }
                }
            });
    }

    closeModal() {
        this.showDialogForgotPasswordChange.next();
    }
}
