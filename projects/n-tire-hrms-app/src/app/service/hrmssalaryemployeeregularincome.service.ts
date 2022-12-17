import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { hrmssalaryemployeeregularincome } from '../model/hrmssalaryemployeeregularincome.model';
import { environment } from '../../environments/environment';
import { IhrmssalaryemployeeregularincomeResponse } from '../model/hrmssalaryemployeeregularincome.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class hrmssalaryemployeeregularincomeService {
  formData: hrmssalaryemployeeregularincome;
  readonly rootURL = AppConstants.baseURL;
  list: hrmssalaryemployeeregularincome[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatehrmssalaryemployeeregularincomes():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntirehrmsURL + '/hrmssalaryemployeeregularincome', body);
  }
  }

  saveOrUpdatehrmssalaryemployeeregularincomesList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntirehrmsURL + '/hrmssalaryemployeeregularincome', body);
  }
  }

  gethrmssalaryemployeeregularincomesList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmssalaryemployeeregularincome').toPromise();
  }
  }
  getListByriid(riid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmssalaryemployeeregularincome'+'/riid/'+riid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmssalaryemployeeregularincome'+'/param/'+key).toPromise();
  }
  }


  gethrmssalaryemployeeregularincomesByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmssalaryemployeeregularincome'+'/e/'+id).toPromise();
  }
  }
  gethrmssalaryemployeeregularincomesByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmssalaryemployeeregularincome'+'/'+id).toPromise();
  }
  }

  deletehrmssalaryemployeeregularincome(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntirehrmsURL + '/hrmssalaryemployeeregularincome'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntirehrmsURL + '/hrmssalaryemployeeregularincome')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

