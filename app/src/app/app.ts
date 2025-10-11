import { Component, DestroyRef, OnInit } from '@angular/core';
import { NavigationStart, Router, RouterOutlet } from '@angular/router';
import { AlertComponent } from "./shared/alert/alert.component";
import { SwPush, SwUpdate } from "@angular/service-worker";
import { environment } from "../environments/environment";
import { Navbar } from './navbar/navbar';
import { UserService } from './services/user.service';
import { filter } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NgClass } from '@angular/common';

@Component({
    selector: 'app-root',
    imports: [RouterOutlet, AlertComponent, Navbar, NgClass],
    templateUrl: './app.html',
    styleUrl: './app.scss',
})
export class App implements OnInit {

    showNavbar = true;

    constructor(
        private readonly sw: SwPush,
        private readonly swUpdate: SwUpdate,
        private readonly userService: UserService,
        private readonly router: Router,
        private readonly destroyRef: DestroyRef
    ) {
        if (environment.production) {
            // Force refresh PWA
            this.swUpdate.checkForUpdate();
            if (this.swUpdate.isEnabled) {
                this.swUpdate.versionUpdates.subscribe(event => {
                    if (event.type === 'VERSION_READY') {
                        window.location.reload();
                    }
                });
            }

            if (!('serviceWorker' in navigator)) {
                setTimeout(() => {
                    alert('Service workers are not supported in this browser');
                }, 1000);
            }

            if (!this.sw.isEnabled) {
                setTimeout(() => {
                    alert('Service workers are not enabled');
                }, 1000);
            }
        }
    }

    ngOnInit() {
        this.router.events
            .pipe(
                takeUntilDestroyed(this.destroyRef),
                filter(e => e instanceof NavigationStart),
            )
            .subscribe(event => this.showNavbar = !event.url.includes('auth'))
        this.userService.getCurrentUser().subscribe();
    }
}
