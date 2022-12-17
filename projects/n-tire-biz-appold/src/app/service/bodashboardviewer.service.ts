import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { bodashboard } from '../model/bodashboard.model';
import { bodashboarddetail } from '../model/bodashboarddetail.model';
import { environment } from '../../environments/environment';
import { IbodashboardResponse } from '../model/bodashboard.model';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
//import { NbAuthService } from '../../../node_modules/@nebular/auth/services/auth.service';
//import {  NbAuthJWTToken } from '../../../node_modules/@nebular/auth/services/token/token';
import { AppConstants } from '../../../../n-tire-biz-app/src/app/shared/helper'

@Injectable({
    providedIn: 'root'
})
export class BODashboardViewerService {
    SessionUser = { companyid: 0, userid: 0, usercode: '', username: '', language: '' };
    formData: bodashboard;
    readonly rootURL = AppConstants.baseURL;
    bodashboarddetails: bodashboarddetail[] = [];
    list: bodashboard[];

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
  */saveOrUpdateBODashboards() {
        if (this.valid()) {
            var body = {
                ...this.formData,
                BODashboardDetails: this.bodashboarddetails,
                SessionUser: this.SessionUser
            };
            return this.http.post(AppConstants.ntiredashboardsURL + '/BODashboard', body);
        }
    }


    getBODashboardResultsByID(id: number, dt: string, p1: string, p2: string, p3: string): any {
        if (this.valid()) {
            if (dt == "") dt = "ALL";
            let url = AppConstants.ntiredashboardsURL + '/BODashboardViewer/' + id + '/' + dt;
            if (p1 != "") url += "/" + p1;
            if (p2 != "") url += "/" + p2;
            if (p3 != "") url += "/" + p3;
            return this.http.get(url).toPromise();
        }
    }

    getBODashboardsList() {
        if (this.valid()) {
            return this.http.get(AppConstants.ntiredashboardsURL + '/BODashboard').toPromise();
        }
    }
    getList(key: string) {
        if (this.valid()) {
            return this.http.get(AppConstants.ntiredashboardsURL + '/BODashboard' + '/param/' + key).toPromise();
        }
    }

    getBODashboardsByID(id: number): any {
        if (this.valid()) {
            return this.http.get(AppConstants.ntiredashboardsURL + '/BODashboard' + '/' + id).toPromise();
        }
    }

    deleteBODashboard(id: number) {
        if (this.valid()) {
            return this.http.delete(AppConstants.ntiredashboardsURL + '/BODashboard' + '/' + id).toPromise();
        }
    }
    clearList() {
        this.bodashboarddetails = [];
    }
    refreshList() {
        if (this.valid()) {
            this.http.get(AppConstants.ntiredashboardsURL + '/BODashboard')
                .toPromise()
                .then(res => this.list = res as any[]);
        }
    }
    search(filter: { name: string } = { name: '' }, page = 1): Observable<IbodashboardResponse> {
        return this.http.get<IbodashboardResponse>(AppConstants.ntiredashboardsURL + '/BODashboard')
            .pipe(
                tap((response: IbodashboardResponse) => {
                    console.log(response);
                    ////debugger;
                    var response1;
                    response1 = response;
                    //response.results = response1.map(bodashboard => new BODashboard(bodashboard.DashboardID,bodashboard.DashboardName,bodashboard.Rows,bodashboard.Cols,bodashboard.Remarks,bodashboard.UserID,bodashboard.Module,""))
                    // Not filtering in the server since in-memory-web-api has somewhat restricted api
                    //.filter(bodashboard => bodashboard.DashboardName.includes(filter.name))

                    return response;
                })
            );
    }


}

