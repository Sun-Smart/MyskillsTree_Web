import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { hrmssalaryemployeeregularincomeshistory } from '../model/hrmssalaryemployeeregularincomeshistory.model';
import { environment } from '../../environments/environment';
import { IhrmssalaryemployeeregularincomeshistoryResponse } from '../model/hrmssalaryemployeeregularincomeshistory.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class hrmssalaryemployeeregularincomeshistoryService {
  formData: hrmssalaryemployeeregularincomeshistory;
  readonly rootURL = AppConstants.baseURL;
  list: hrmssalaryemployeeregularincomeshistory[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatehrmssalaryemployeeregularincomeshistories():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntirehrmsURL + '/hrmssalaryemployeeregularincomeshistory', body);
  }
  }

  saveOrUpdatehrmssalaryemployeeregularincomeshistoriesList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntirehrmsURL + '/hrmssalaryemployeeregularincomeshistory', body);
  }
  }

  gethrmssalaryemployeeregularincomeshistoriesList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmssalaryemployeeregularincomeshistory').toPromise();
  }
  }
  getListByriid(riid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmssalaryemployeeregularincomeshistory'+'/riid/'+riid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmssalaryemployeeregularincomeshistory'+'/param/'+key).toPromise();
  }
  }


  gethrmssalaryemployeeregularincomeshistoriesByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmssalaryemployeeregularincomeshistory'+'/e/'+id).toPromise();
  }
  }
  gethrmssalaryemployeeregularincomeshistoriesByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmssalaryemployeeregularincomeshistory'+'/'+id).toPromise();
  }
  }

  deletehrmssalaryemployeeregularincomeshistory(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntirehrmsURL + '/hrmssalaryemployeeregularincomeshistory'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntirehrmsURL + '/hrmssalaryemployeeregularincomeshistory')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

