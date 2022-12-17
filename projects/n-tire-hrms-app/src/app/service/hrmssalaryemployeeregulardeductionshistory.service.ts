import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { hrmssalaryemployeeregulardeductionshistory } from '../model/hrmssalaryemployeeregulardeductionshistory.model';
import { environment } from '../../environments/environment';
import { IhrmssalaryemployeeregulardeductionshistoryResponse } from '../model/hrmssalaryemployeeregulardeductionshistory.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class hrmssalaryemployeeregulardeductionshistoryService {
  formData: hrmssalaryemployeeregulardeductionshistory;
  readonly rootURL = AppConstants.baseURL;
  list: hrmssalaryemployeeregulardeductionshistory[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatehrmssalaryemployeeregulardeductionshistories():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntirehrmsURL + '/hrmssalaryemployeeregulardeductionshistory', body);
  }
  }

  saveOrUpdatehrmssalaryemployeeregulardeductionshistoriesList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntirehrmsURL + '/hrmssalaryemployeeregulardeductionshistory', body);
  }
  }

  gethrmssalaryemployeeregulardeductionshistoriesList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmssalaryemployeeregulardeductionshistory').toPromise();
  }
  }
  getListByrdid(rdid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmssalaryemployeeregulardeductionshistory'+'/rdid/'+rdid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmssalaryemployeeregulardeductionshistory'+'/param/'+key).toPromise();
  }
  }


  gethrmssalaryemployeeregulardeductionshistoriesByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmssalaryemployeeregulardeductionshistory'+'/e/'+id).toPromise();
  }
  }
  gethrmssalaryemployeeregulardeductionshistoriesByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmssalaryemployeeregulardeductionshistory'+'/'+id).toPromise();
  }
  }

  deletehrmssalaryemployeeregulardeductionshistory(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntirehrmsURL + '/hrmssalaryemployeeregulardeductionshistory'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntirehrmsURL + '/hrmssalaryemployeeregulardeductionshistory')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

