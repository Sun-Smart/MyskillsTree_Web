import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { hrmssalaryemployeeannualincomeshistory } from '../model/hrmssalaryemployeeannualincomeshistory.model';
import { environment } from '../../environments/environment';
import { IhrmssalaryemployeeannualincomeshistoryResponse } from '../model/hrmssalaryemployeeannualincomeshistory.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class hrmssalaryemployeeannualincomeshistoryService {
  formData: hrmssalaryemployeeannualincomeshistory;
  readonly rootURL = AppConstants.baseURL;
  list: hrmssalaryemployeeannualincomeshistory[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatehrmssalaryemployeeannualincomeshistories():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntirehrmsURL + '/hrmssalaryemployeeannualincomeshistory', body);
  }
  }

  saveOrUpdatehrmssalaryemployeeannualincomeshistoriesList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntirehrmsURL + '/hrmssalaryemployeeannualincomeshistory', body);
  }
  }

  gethrmssalaryemployeeannualincomeshistoriesList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmssalaryemployeeannualincomeshistory').toPromise();
  }
  }
  getListByaiid(aiid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmssalaryemployeeannualincomeshistory'+'/aiid/'+aiid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmssalaryemployeeannualincomeshistory'+'/param/'+key).toPromise();
  }
  }


  gethrmssalaryemployeeannualincomeshistoriesByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmssalaryemployeeannualincomeshistory'+'/e/'+id).toPromise();
  }
  }
  gethrmssalaryemployeeannualincomeshistoriesByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmssalaryemployeeannualincomeshistory'+'/'+id).toPromise();
  }
  }

  deletehrmssalaryemployeeannualincomeshistory(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntirehrmsURL + '/hrmssalaryemployeeannualincomeshistory'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntirehrmsURL + '/hrmssalaryemployeeannualincomeshistory')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

