import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { hrmsemployeereporting } from '../model/hrmsemployeereporting.model';
import { environment } from '../../environments/environment';
import { IhrmsemployeereportingResponse } from '../model/hrmsemployeereporting.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class hrmsemployeereportingService {
  formData: hrmsemployeereporting;
  readonly rootURL = AppConstants.baseURL;
  list: hrmsemployeereporting[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatehrmsemployeereportings():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntirehrmsURL + '/hrmsemployeereporting', body);
  }
  }

  saveOrUpdatehrmsemployeereportingsList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntirehrmsURL + '/hrmsemployeereporting', body);
  }
  }

  gethrmsemployeereportingsList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeereporting').toPromise();
  }
  }
  getListByreportingid(reportingid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeereporting'+'/reportingid/'+reportingid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeereporting'+'/param/'+key).toPromise();
  }
  }


  gethrmsemployeereportingsByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeereporting'+'/e/'+id).toPromise();
  }
  }
  gethrmsemployeereportingsByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeereporting'+'/'+id).toPromise();
  }
  }

  deletehrmsemployeereporting(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntirehrmsURL + '/hrmsemployeereporting'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeereporting')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

