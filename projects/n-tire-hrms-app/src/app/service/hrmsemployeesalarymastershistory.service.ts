import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { hrmsemployeesalarymastershistory } from '../model/hrmsemployeesalarymastershistory.model';
import { hrmssalaryemployeeannualincomeshistory } from '../model/hrmssalaryemployeeannualincomeshistory.model';
import { hrmssalaryemployeeregulardeductionshistory } from '../model/hrmssalaryemployeeregulardeductionshistory.model';
import { hrmssalaryemployeeregularincomeshistory } from '../model/hrmssalaryemployeeregularincomeshistory.model';
import { environment } from '../../environments/environment';
import { IhrmsemployeesalarymastershistoryResponse } from '../model/hrmsemployeesalarymastershistory.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class hrmsemployeesalarymastershistoryService {
  formData: hrmsemployeesalarymastershistory;
  readonly rootURL = AppConstants.baseURL;
  list: hrmsemployeesalarymastershistory[];
  hrmssalaryemployeeannualincomeshistories: hrmssalaryemployeeannualincomeshistory[]=[];
  hrmssalaryemployeeregulardeductionshistories: hrmssalaryemployeeregulardeductionshistory[]=[];
  hrmssalaryemployeeregularincomeshistories: hrmssalaryemployeeregularincomeshistory[]=[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatehrmsemployeesalarymastershistories():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
      hrmssalaryemployeeannualincomeshistories: this.hrmssalaryemployeeannualincomeshistories.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
      hrmssalaryemployeeregulardeductionshistories: this.hrmssalaryemployeeregulardeductionshistories.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
      hrmssalaryemployeeregularincomeshistories: this.hrmssalaryemployeeregularincomeshistories.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
    };
    return this.http.post(AppConstants.ntirehrmsURL + '/hrmsemployeesalarymastershistory', body);
  }
  }

  saveOrUpdatehrmsemployeesalarymastershistoriesList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntirehrmsURL + '/hrmsemployeesalarymastershistory', body);
  }
  }

  gethrmsemployeesalarymastershistoriesList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeesalarymastershistory').toPromise();
  }
  }
  getListBysalarymasterid(salarymasterid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeesalarymastershistory'+'/salarymasterid/'+salarymasterid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeesalarymastershistory'+'/param/'+key).toPromise();
  }
  }


  gethrmsemployeesalarymastershistoriesByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeesalarymastershistory'+'/e/'+id).toPromise();
  }
  }
  gethrmsemployeesalarymastershistoriesByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeesalarymastershistory'+'/'+id).toPromise();
  }
  }

  deletehrmsemployeesalarymastershistory(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntirehrmsURL + '/hrmsemployeesalarymastershistory'+'/'+id).toPromise();
  }
  }
clearList(){
this.hrmssalaryemployeeannualincomeshistories = [];
this.hrmssalaryemployeeregulardeductionshistories = [];
this.hrmssalaryemployeeregularincomeshistories = [];
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeesalarymastershistory')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

