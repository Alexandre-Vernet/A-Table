import { Component, OnDestroy, OnInit } from '@angular/core';
import { AlertService } from '../../services/alert.service';
import { Alert } from '../../dto/Alert';
import { Message } from 'primeng/message';
import { Subscription } from 'rxjs';

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

    constructor(private alertService: AlertService) {
    }

    ngOnInit() {
        this.subscription = this.alertService.alert$
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
