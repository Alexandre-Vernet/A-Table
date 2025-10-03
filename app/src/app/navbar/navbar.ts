import { Component, OnInit } from '@angular/core';
import { Menubar } from 'primeng/menubar';
import { MenuItem } from 'primeng/api';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../services/user.service';
import { User } from '../dto/User';
import { AlertService } from '../services/alert.service';
import { Ripple } from 'primeng/ripple';

@Component({
    selector: 'app-navbar',
    imports: [
        Menubar,
        Ripple,
        RouterLink
    ],
    templateUrl: './navbar.html',
    styleUrl: './navbar.scss'
})
export class Navbar implements OnInit {

    items: MenuItem[] = [];
    user: User;

    constructor(
        private readonly router: Router,
        private readonly userService: UserService,
        private readonly alertService: AlertService
    ) {
    }

    ngOnInit() {
        const baseItems: MenuItem[] = [
            {
                label: 'Accueil',
                icon: 'pi pi-home',
                command: () => this.router.navigate(['/'])
            },
        ];

        this.userService.user$.subscribe({
            next: (user) => {
                if (user) {
                    this.user = user;
                    this.items = [
                        ...baseItems,
                        {
                            label: 'Mon compte',
                            icon: 'pi pi-user',
                            command: () => this.router.navigate(['user', 'user-profile', user?.id])
                        },
                        {
                            label: 'Se déconnecter',
                            icon: 'pi pi-sign-out',
                            command: () => {
                                this.alertService.showSuccess('Vous avez été déconnecté');
                                this.router.navigate(['/']);
                                this.userService.signOut();
                            }
                        }
                    ];
                } else {
                    this.items = [
                        ...baseItems,
                        {
                            label: 'Se connecter',
                            icon: 'pi pi-sign-in',
                            command: () => this.router.navigate(['auth', 'login'])
                        }
                    ];
                }
            },
            error: () => {
                this.items = [
                    ...baseItems,
                    {
                        label: 'Se connecter',
                        icon: 'pi pi-sign-in',
                        command: () => this.router.navigate(['auth', 'login'])
                    }
                ];
            }
        });
    }

}
