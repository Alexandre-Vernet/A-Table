import { Component, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Button } from 'primeng/button';
import { Dialog } from 'primeng/dialog';
import { FloatLabel } from 'primeng/floatlabel';
import { InputText } from 'primeng/inputtext';
import { Message } from 'primeng/message';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
// import emailjs from '@emailjs/browser';
import { environment } from '../../../environments/environment';
import { AuthService } from '../auth.service';
import { AlertService } from '../../services/alert.service';
import { Subject } from 'rxjs';

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
        this.isLoading = true;

        const email = this.email.value;

        // this.authService.sendEmailForgotPassword(email)
        //     .subscribe({
        //         next: ({ linkResetPassword }) => {
        //             emailjs.send(environment.EMAIL_JS.SERVICE_ID, environment.EMAIL_JS.TEMPLATE_ID, {
        //                     linkResetPassword,
        //                     email
        //                 },
        //                 environment.EMAIL_JS.PUBLIC_KEY
        //             ).then(
        //                 () => {
        //                     this.closeModal();
        //                     this.isLoading = false;
        //
        //                     this.alertService.alert$.next({
        //                         severity: 'success',
        //                         message: 'Un email vous a été envoyé pour réinitialiser votre mot de passe'
        //                     });
        //                 },
        //                 () => {
        //                     this.isLoading = false;
        //
        //                     this.alertService.alert$.next({
        //                         severity: 'error',
        //                         message: 'Une erreur s`est produite lors de l`envoi de l`email'
        //                     });
        //                 }
        //             );
        //         }
        //     });
    }

    closeModal() {
        this.showDialogForgotPasswordChange.next();
    }
}
