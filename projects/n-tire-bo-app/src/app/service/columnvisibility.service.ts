import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { columnvisibility } from '../model/columnvisibility.model';
import { environment } from '../../environments/environment';
import { IcolumnvisibilityResponse } from '../model/columnvisibility.model';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
//import { NbAuthService } from '../../../node_modules/@nebular/auth/services/auth.service';
//import {  NbAuthJWTToken } from '../../../node_modules/@nebular/auth/services/token/token';
import { AppConstants } from '../../../../n-tire-bo-app/src/app/shared/helper'

@Injectable({
    providedIn: 'root'
})
export class columnvisibilityService {
    SessionUser = { companyid: 0, userid: 0, usercode: '', username: '', language: '' };
    formData: columnvisibility;
    readonly rootURL = AppConstants.ntireboURL;
    list: columnvisibility[];

    constructor(private http: HttpClient) { }

    valid() {
        return true;
    }/*return this.service.getToken()
.subscribe((token: NbAuthJWTToken) => {
if (token.isvalid()) {
let payload = token.getPayload(); // here we receive a payload from the token and assigne it to our `user` variable 
1=payload.companyid;
this.SessionUser.userid=payload.userid;
this.SessionUser.usercode=payload.usercode;
this.SessionUser.language=payload.language;
this.SessionUser.username=payload.username;
return true;
}
return false; 
});

}
  */saveOrUpdatecolumnvisibilities() {
        {
            var body = {
                ...this.formData,
                SessionUser: this.SessionUser
            };
            return this.http.post(AppConstants.ntireboURL + '/columnvisibility', body);
        }
    }

    getcolumnvisibilitiesList() {
        {
            return this.http.get(AppConstants.ntireboURL + '/columnvisibility/' + 1).toPromise();
        }
    }
    getList(key: string) {
        {
            return this.http.get(AppConstants.ntireboURL + '/columnvisibility/' + 1 + '/param/' + key).toPromise();
        }
    }

    getcolumnvisibilitiesByID(id: number): any {
        {
            return this.http.get(AppConstants.ntireboURL + '/columnvisibility/' + 1 + '/' + id).toPromise();
        }
    }

    deletecolumnvisibility(id: number) {
        {
            return this.http.delete(AppConstants.ntireboURL + '/columnvisibility/' + 1 + '/' + id).toPromise();
        }
    }
    clearList() {
    }
    refreshList() {
        {
            this.http.get(AppConstants.ntireboURL + '/columnvisibility/' + 1)
                .toPromise()
                .then((res:any) => this.list = res as any[]);
        }
    }

}

