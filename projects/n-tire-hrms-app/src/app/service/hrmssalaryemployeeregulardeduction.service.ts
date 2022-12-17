import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { hrmssalaryemployeeregulardeduction } from '../model/hrmssalaryemployeeregulardeduction.model';
import { environment } from '../../environments/environment';
import { IhrmssalaryemployeeregulardeductionResponse } from '../model/hrmssalaryemployeeregulardeduction.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class hrmssalaryemployeeregulardeductionService {
  formData: hrmssalaryemployeeregulardeduction;
  readonly rootURL = AppConstants.baseURL;
  list: hrmssalaryemployeeregulardeduction[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatehrmssalaryemployeeregulardeductions():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntirehrmsURL + '/hrmssalaryemployeeregulardeduction', body);
  }
  }

  saveOrUpdatehrmssalaryemployeeregulardeductionsList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntirehrmsURL + '/hrmssalaryemployeeregulardeduction', body);
  }
  }

  gethrmssalaryemployeeregulardeductionsList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmssalaryemployeeregulardeduction').toPromise();
  }
  }
  getListByrdid(rdid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmssalaryemployeeregulardeduction'+'/rdid/'+rdid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmssalaryemployeeregulardeduction'+'/param/'+key).toPromise();
  }
  }


  gethrmssalaryemployeeregulardeductionsByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmssalaryemployeeregulardeduction'+'/e/'+id).toPromise();
  }
  }
  gethrmssalaryemployeeregulardeductionsByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmssalaryemployeeregulardeduction'+'/'+id).toPromise();
  }
  }

  deletehrmssalaryemployeeregulardeduction(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntirehrmsURL + '/hrmssalaryemployeeregulardeduction'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntirehrmsURL + '/hrmssalaryemployeeregulardeduction')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

