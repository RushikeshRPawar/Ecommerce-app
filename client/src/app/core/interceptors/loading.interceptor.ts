import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { delay, finalize } from 'rxjs/operators';
import { BsuyService } from '../services/bsuy.service';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor{
constructor(private busyService: BsuyService){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.busyService.busy();
        return next.handle(req).pipe(
            delay(1000),
            finalize(
                () => { this.busyService.idle();
                })
        );
    }
}
