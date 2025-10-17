import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { Alert } from '../dto/Alert';

@Injectable({ providedIn: 'root' })
export class AlertService {

    private alertSubject = new ReplaySubject<Alert>(1);
    alert$ = this.alertSubject.asObservable();

    showSuccess(message: string) {
        this.alertSubject.next({ severity: 'success', message });
    }

    showError(message: string) {
        this.alertSubject.next({ severity: 'error', message });
    }

    showInfo(message: string) {
        this.alertSubject.next({ severity: 'info', message });
    }

    clear() {
        this.alertSubject.next(null);
    }
}
