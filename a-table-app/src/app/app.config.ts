import {
    ApplicationConfig,
    isDevMode,
    provideBrowserGlobalErrorListeners,
    provideZoneChangeDetection
} from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { providePrimeNG } from 'primeng/config';
import { provideServiceWorker } from '@angular/service-worker';
import { provideAnimations } from "@angular/platform-browser/animations";
import { MessageService } from "primeng/api";
import { authInterceptor } from './auth/auth.interceptor';
import { CustomPreset } from './CustomPreset';
import { loaderInterceptor } from './interceptor/loader-interceptor';

export const appConfig: ApplicationConfig = {
    providers: [
        provideBrowserGlobalErrorListeners(),
        provideZoneChangeDetection({ eventCoalescing: true }),
        provideRouter(routes, withInMemoryScrolling({
            scrollPositionRestoration: 'top',
            anchorScrolling: 'enabled'
        })),
        provideHttpClient(withInterceptors([authInterceptor, loaderInterceptor])),
        providePrimeNG({
            theme: {
                preset: CustomPreset
            }
        }),
        provideServiceWorker('ngsw-worker.js', {
            enabled: !isDevMode(),
            registrationStrategy: 'registerWhenStable:30000'
        }),
        provideAnimations(),
        MessageService,
    ]
};
