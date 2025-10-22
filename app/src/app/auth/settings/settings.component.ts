import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../dto/User';
import { FloatLabel } from 'primeng/floatlabel';
import { InputText } from 'primeng/inputtext';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Button } from 'primeng/button';
import { Router } from '@angular/router';
import { AlertService } from '../../services/alert.service';
import { Password } from 'primeng/password';
import { Message } from 'primeng/message';
import { ConfirmationService } from 'primeng/api';
import { ConfirmDialog } from 'primeng/confirmdialog';

@Component({
    selector: 'app-settings',
    imports: [
        FloatLabel,
        InputText,
        FormsModule,
        Button,
        ReactiveFormsModule,
        Password,
        Message,
        ConfirmDialog
    ],
    providers: [ConfirmationService],
    templateUrl: './settings.component.html',
    styleUrl: './settings.component.scss'
})
export class SettingsComponent implements OnInit {

    formSignUp = new FormGroup({
        email: new FormControl(null, [Validators.required, Validators.email]),
        password: new FormControl(null, [Validators.minLength(6)]),
        confirmPassword: new FormControl(null, [Validators.minLength(6)]),
        firstName: new FormControl(null, [Validators.minLength(3), Validators.maxLength(50)]),
        lastName: new FormControl(null, [Validators.minLength(3), Validators.maxLength(50)]),
    });

    constructor(
        private readonly userService: UserService,
        private readonly router: Router,
        private readonly alertService: AlertService,
        private readonly confirmationService: ConfirmationService
    ) {
    }

    ngOnInit() {
        this.userService.getCurrentUser()
            .subscribe(user => this.formSignUp.patchValue({
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
            }));
    }

    updateUser() {
        const { firstName, lastName, password } = this.formSignUp.value;

        const user: User = {};

        if (firstName) {
            user.firstName = firstName.trim();
        }

        if (lastName) {
            user.lastName = lastName.trim();
        }

        if (password) {
            user.password = password.trim();
        }

        if (Object.keys(user).length === 0) {
            this.alertService.showInfo('Aucune information à mettre à jour');
            return;
        }

        this.userService.updateUser(user)
            .subscribe({
                next: () => this.alertService.showSuccess('Vos informations ont étés mise à jour avec succès'),
                error: (err) => this.alertService.showError(err?.error?.message ?? 'Impossible de mettre à jour vos informations'),
            });
    }

    confirmDeactivateAccount(event: Event) {
        this.confirmationService.confirm({
            target: event.target as EventTarget,
            message: 'Voulez-vous vraiment désactiver votre compte ?',
            header: 'Important',
            icon: 'pi pi-info-circle',
            rejectLabel: 'Cancel',
            rejectButtonProps: {
                label: 'Cancel',
                severity: 'secondary',
                outlined: true,
            },
            acceptButtonProps: {
                label: 'Delete',
                severity: 'danger',
            },

            accept: () => {
                this.deactivateAccount();
            },
        });
    }

    private deactivateAccount() {
        this.userService.deactivateAccount()
            .subscribe({
                next: () => {
                    this.router.navigateByUrl('/');
                    this.userService.signOut();
                    this.alertService.showSuccess('Votre compte a bien été désactivé');
                },
                error: (err) => this.alertService.showError(err?.error?.message ?? 'Impossible de désactiver votre compte')
            })
    }
}
