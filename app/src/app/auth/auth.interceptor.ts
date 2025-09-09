import { HttpHandlerFn, HttpRequest } from '@angular/common/http';

export const authInterceptor = (request: HttpRequest<unknown>, next: HttpHandlerFn) => {
    const token = localStorage.getItem('access-token');
    if (token) {
        request = request.clone({
            setHeaders: {
                Authorization: `Bearer ${ token }`
            }
        });
    }
    return next(request);
};
