import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { boreport } from '../model/boreport.model';
import { boreportcolumn } from '../model/boreportcolumn.model';
import { environment } from '../../environments/environment';
import { IboreportResponse } from '../model/boreport.model';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
//import { NbAuthService } from '../../../node_modules/@nebular/auth/services/auth.service';
//import { NbAuthJWTToken } from '../../../node_modules/@nebular/auth/services/token/token';
import { AppConstants } from '../../../../n-tire-biz-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-biz-app/src/app/pages/core/services/session.service';



@Injectable({
    providedIn: 'root'
})
export class BOReportViewerService {
    //SessionUser = { companyid: 0, userid: 0, empid: 0, usercode: '', username: '', language: '' };
    SessionUser = JSON.parse(this.sessionService.getItem("currentUser"));
    formData: boreport;
    readonly rootURL = AppConstants.ntireboURL;
    boreportcolumns: boreportcolumn[] = [];
    list: boreport[];
    Insertids: any[] = [];
    actionids: any[] = [];
    formid: any = null;

    fkname: any = "";
    fk: any = "";
    fkname1: any = "";
    fk1: any = "";
    localStr: string;

    constructor(private http: HttpClient, public sessionService: SessionService) { }

    valid() {
        var sessionuser = JSON.parse(this.sessionService.getItem("currentUser"));
        if (sessionuser != null) {
            this.SessionUser = sessionuser;
            return true;
        }
        return false;
    }
    saveOrUpdateBOReports() {
        {
            var body = {
                ...this.formData,
                BOReportColumns: this.boreportcolumns,
                SessionUser: this.SessionUser
            };
            return this.http.post(AppConstants.ntireboURL + '/BOReport', body);
        }
    }

    uploaddata(reportid, data) {
        var body = {
            reportid,
            data: JSON.stringify(data)
        }
        return this.http.post(AppConstants.ntireboURL + '/ReportViewer/upload', body).toPromise();
    }
    saveview(reportid, view, filters) {
        var body = {
            reportid,
            view,
            filters: JSON.stringify(filters)
        }
        return this.http.post(AppConstants.ntireboURL + '/ReportViewer/saveview', body).toPromise();
    }

    process(menuid, objaction, pk, modulename) {
        this.actionids = [];
        this.actionids.push(pk);
        return this.action(menuid, objaction, modulename)
    }

    action(menuid, action, modulename, dialogdata = null) {
        debugger;
        let v_dialogdata = null;
        if (dialogdata != null) v_dialogdata = JSON.stringify(dialogdata);
        if (action.modulename != undefined) modulename = action.modulename;
        if (this.formid == null) this.formid = 0;
        {
            var body = {
                menuid: "" + menuid,
                actionid: "" + action.actionid,
                ids: this.actionids,
                formid: this.formid,
                actionname: action.actionname,
                SessionUser: this.SessionUser,
                fkname: this.fkname,
                fkname1: this.fkname1,
                fk: this.fk,
                fk1: this.fk1,
                modulename: modulename,
                dialogdata: v_dialogdata,
                
            };
            if (action.actiontype == "P") {

                return this.http.post(AppConstants.ntireboURL + '/ReportViewer/runprocedure', body).toPromise();
            }
            else {
                return this.http.post(AppConstants.ntireboURL + '/' + action.servicename + '/' + action.actionname, body).toPromise();
            }
        }
    }
    runsp(menuid, spname, id, modulename) {
        //debugger;
        var action = {
            actionname: spname,
            actionid: -5001,
            actiontype: "P"
        }

        this.actionids = [];
        this.actionids.push("" + id);
        return this.action(menuid, action, modulename);
    }

    runemail(menuid, data) {
        {
            var body = {
                menuid: "" + menuid,
                data: data,
                SessionUser: this.SessionUser
            };
            return this.http.post(AppConstants.ntireboURL + '/ReportViewer/' + 'email', body).toPromise();
        }
    }


    getBOReportsList() {
        {
            return this.http.get(AppConstants.ntireboURL + '/BOReport').toPromise();
        }
    }
    getList(key: string) {
        {
            return this.http.get(AppConstants.ntireboURL + '/BOReport' + '/param/' + key).toPromise();
        }
    }

    getBOReportResultsByID(id: string, fkname: any, fk: any, fkname1: any, fk1: any, status: any, parameters: any, addparams: any, pk: any, modulename: any = "", modulepkcol: any = ""): any {
        {
            let v_parameters = null;
            //v_parameters=JSON.parse(parameters);
            // this.localStr="";
            // if (localStorage.getItem('role') == '1') {
            //     this.localStr='arrA';
            // }else if(localStorage.getItem('role') == '2'){
            //     this.localStr=localStorage.getItem('applicantid');
            // }
            var body = {

                id: id,
                SessionUser: "ss",//this.SessionUser,
                parameters: null,// parameters,
                addparams: null,// addparams,
                status: status,
                fkname: fkname,
                fk: fk,
                fkname1: fkname1,
                fk1: fk1,
                modulename: modulename,
                modulepkcol: modulepkcol,
                key: "",
                pkvalue: 0//pk

            };
            if (fk == null || fk == undefined) fk = "";
            if (fkname == null || fkname == undefined) fkname = "";

            if (fk1 == null || fk1 == undefined) fk1 = "";
            if (fkname1 == null || fkname1 == undefined) fkname1 = "";


            // return this.http.post(AppConstants.ntireboURL + '/ReportViewer/' + '/' + id,body).toPromise();

            return this.http.post(AppConstants.ntireboURL + '/ReportViewer', body).toPromise();
            /*
            else
            {
                return this.http.get(AppConstants.ntireboURL + '/ReportViewer/'  + id+ '/' + fkname + '/' + fk).toPromise();
            }
            */
        }
    }

    getBOReportsByID(id: number): any {
        {
            return this.http.get(AppConstants.ntireboURL + '/BOReport' + '/' + id).toPromise();
        }
    }

    deleteBOReport(id: number) {
        {
            return this.http.delete(AppConstants.ntireboURL + '/BOReport' + '/' + id).toPromise();
        }
    }
    clearList() {
        this.boreportcolumns = [];
    }
    refreshList() {
        {
            this.http.get(AppConstants.ntireboURL + '/BOReport')
                .toPromise()
                .then((res: any) => this.list = res as any[]);
        }
    }
    search(filter: { name: string } = { name: '' }, page = 1): Observable<IboreportResponse> {
        return this.http.get<IboreportResponse>(AppConstants.ntireboURL + '/BOReport')
            .pipe(
                tap((response: IboreportResponse) => {
                    console.log(response);
                    ////debugger;
                    var response1;
                    response1 = response;
                    /*
                    response.results = response1.map(boreport => new BOReport(boreport.ReportID, boreport.ReportName, boreport.ReportType, boreport.ReportTypeDesc, boreport.DateFilter, boreport.DateFilterColumnName, boreport.DateFilterType, boreport.DateFilterTypeDesc, boreport.Header, boreport.Footer, boreport.MainTableName, boreport.MainTableAlias, boreport.MainTableIdentityField, boreport.GroupBy, boreport.SortBy1, boreport.SortBy2, boreport.SortBy3, boreport.Query, boreport.NumRows, boreport.ReportOutputType, boreport.ReportOutputTypeDesc, boreport.DetailTableName, boreport.DetailTableAlias, boreport.DetailTableIdentityField, boreport.DetailTableFK, boreport.DetailTableConcatenate, boreport.OtherTables, boreport.OtherColumns, boreport.OtherConditions, boreport.Status, ""))
                      // Not filtering in the server since in-memory-web-api has somewhat restricted api
                      .filter(boreport => boreport.ReportName.includes(filter.name))
                    */
                    return response;
                })
            );
    }


}

