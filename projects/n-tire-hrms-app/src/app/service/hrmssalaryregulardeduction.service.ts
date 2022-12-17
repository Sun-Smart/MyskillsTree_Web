import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { hrmssalaryregulardeduction } from '../model/hrmssalaryregulardeduction.model';
import { environment } from '../../environments/environment';
import { IhrmssalaryregulardeductionResponse } from '../model/hrmssalaryregulardeduction.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class hrmssalaryregulardeductionService {
  formData: hrmssalaryregulardeduction;
  readonly rootURL = AppConstants.baseURL;
  list: hrmssalaryregulardeduction[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatehrmssalaryregulardeductions():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntirehrmsURL + '/hrmssalaryregulardeduction', body);
  }
  }

  saveOrUpdatehrmssalaryregulardeductionsList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntirehrmsURL + '/hrmssalaryregulardeduction', body);
  }
  }

  gethrmssalaryregulardeductionsList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmssalaryregulardeduction').toPromise();
  }
  }
  getListByrdid(rdid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmssalaryregulardeduction'+'/rdid/'+rdid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmssalaryregulardeduction'+'/param/'+key).toPromise();
  }
  }


  gethrmssalaryregulardeductionsByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmssalaryregulardeduction'+'/e/'+id).toPromise();
  }
  }
  gethrmssalaryregulardeductionsByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmssalaryregulardeduction'+'/'+id).toPromise();
  }
  }

  deletehrmssalaryregulardeduction(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntirehrmsURL + '/hrmssalaryregulardeduction'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntirehrmsURL + '/hrmssalaryregulardeduction')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

