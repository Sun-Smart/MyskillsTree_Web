import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { hrmsemployeestatutorybenefit } from '../model/hrmsemployeestatutorybenefit.model';
import { environment } from '../../environments/environment';
import { IhrmsemployeestatutorybenefitResponse } from '../model/hrmsemployeestatutorybenefit.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class hrmsemployeestatutorybenefitService {
  formData: hrmsemployeestatutorybenefit;
  readonly rootURL = AppConstants.baseURL;
  list: hrmsemployeestatutorybenefit[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatehrmsemployeestatutorybenefits():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntirehrmsURL + '/hrmsemployeestatutorybenefit', body);
  }
  }

  saveOrUpdatehrmsemployeestatutorybenefitsList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntirehrmsURL + '/hrmsemployeestatutorybenefit', body);
  }
  }

  gethrmsemployeestatutorybenefitsList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeestatutorybenefit').toPromise();
  }
  }
  getListByesid(esid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeestatutorybenefit'+'/esid/'+esid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeestatutorybenefit'+'/param/'+key).toPromise();
  }
  }


  gethrmsemployeestatutorybenefitsByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeestatutorybenefit'+'/e/'+id).toPromise();
  }
  }
  gethrmsemployeestatutorybenefitsByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeestatutorybenefit'+'/'+id).toPromise();
  }
  }

  deletehrmsemployeestatutorybenefit(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntirehrmsURL + '/hrmsemployeestatutorybenefit'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeestatutorybenefit')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

