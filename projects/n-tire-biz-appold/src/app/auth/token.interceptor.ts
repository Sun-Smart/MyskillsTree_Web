import { Injectable } from '@angular/core';
import {
	HttpRequest,
	HttpHandler,
	HttpEvent,
	HttpInterceptor
} from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs/Observable';
@Injectable()
export class TokenInterceptor implements HttpInterceptor {
	constructor(public auth: AuthService) { }
	intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		// debugger;
		//console.log(request);



		var deftoken = "";
		if (this.auth.getToken() != null && this.auth.getToken() != undefined) deftoken = this.auth.getToken();
		/*
		setHeaders: {
			'Accept': 'application/json',
		  'Content-Type': 'application/json',					  
			'Authorization':"Bearer " + deftoken
		  }*/

		if (this.auth.getToken() != null && this.auth.getToken() != undefined) {
			if (request.method == "POST" && request.reportProgress == false) {
				request = request.clone({

					setHeaders: {
						'Accept': 'application/json',
						'Content-Type': 'application/json',
						'Authorization': "Bearer " + deftoken
					}
				});
			}
			else if (request.method == "POST" && request.reportProgress == true) {
				request = request.clone({

					setHeaders: {
						'Accept': '*/*',
						'Authorization': "Bearer " + deftoken
					}
				});
			}
			else {
				request = request.clone({
					setHeaders: {
						'Authorization': "Bearer " + deftoken
					}
				});
			}

		}



		return next.handle(request);
	}
}

// `jwt ${this.auth.getToken()}`