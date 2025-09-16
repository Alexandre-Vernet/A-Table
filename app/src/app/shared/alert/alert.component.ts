import { Component, DestroyRef, inject, OnDestroy, OnInit } from '@angular/core';
import { AlertService } from '../../services/alert.service';
import { Alert } from '../../dto/Alert';
import { Message } from 'primeng/message';
import { Subscription } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
    selector: 'app-alert',
    imports: [
        Message
    ],
    templateUrl: './alert.component.html',
    styleUrl: './alert.component.scss'
})
export class AlertComponent implements OnInit, OnDestroy {
    alert: Alert;
    private subscription: Subscription;
    private destroyRef = inject(DestroyRef);

    constructor(private alertService: AlertService) {
    }

    ngOnInit() {
        this.subscription = this.alertService.alert$
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe(alert => {
                this.alert = alert;
                window.scroll(0, 0);

                if (alert?.severity === 'success') {
                    setTimeout(() => this.alertService.clear(), 4000);
                }
            });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
