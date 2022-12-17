import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { hrmsholidayworkrequest } from '../model/hrmsholidayworkrequest.model';
import { hrmscoffrequest } from '../model/hrmscoffrequest.model';
import { environment } from '../../environments/environment';
import { IhrmsholidayworkrequestResponse } from '../model/hrmsholidayworkrequest.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class hrmsholidayworkrequestService {
  formData: hrmsholidayworkrequest;
  readonly rootURL = AppConstants.baseURL;
  list: hrmsholidayworkrequest[];
  hrmscoffrequests: hrmscoffrequest[]=[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatehrmsholidayworkrequests():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
      hrmscoffrequests: this.hrmscoffrequests.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
    };
    return this.http.post(AppConstants.ntirehrmsURL + '/hrmsholidayworkrequest', body);
  }
  }

  saveOrUpdatehrmsholidayworkrequestsList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntirehrmsURL + '/hrmsholidayworkrequest', body);
  }
  }

  gethrmsholidayworkrequestsList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsholidayworkrequest').toPromise();
  }
  }
  getListByworkrequestid(workrequestid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsholidayworkrequest'+'/workrequestid/'+workrequestid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsholidayworkrequest'+'/param/'+key).toPromise();
  }
  }


  gethrmsholidayworkrequestsByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsholidayworkrequest'+'/e/'+id).toPromise();
  }
  }
  gethrmsholidayworkrequestsByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsholidayworkrequest'+'/'+id).toPromise();
  }
  }

  deletehrmsholidayworkrequest(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntirehrmsURL + '/hrmsholidayworkrequest'+'/'+id).toPromise();
  }
  }
clearList(){
this.hrmscoffrequests = [];
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntirehrmsURL + '/hrmsholidayworkrequest')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

