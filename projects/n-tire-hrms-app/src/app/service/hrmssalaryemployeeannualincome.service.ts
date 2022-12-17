import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { hrmssalaryemployeeannualincome } from '../model/hrmssalaryemployeeannualincome.model';
import { environment } from '../../environments/environment';
import { IhrmssalaryemployeeannualincomeResponse } from '../model/hrmssalaryemployeeannualincome.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class hrmssalaryemployeeannualincomeService {
  formData: hrmssalaryemployeeannualincome;
  readonly rootURL = AppConstants.baseURL;
  list: hrmssalaryemployeeannualincome[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatehrmssalaryemployeeannualincomes():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntirehrmsURL + '/hrmssalaryemployeeannualincome', body);
  }
  }

  saveOrUpdatehrmssalaryemployeeannualincomesList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntirehrmsURL + '/hrmssalaryemployeeannualincome', body);
  }
  }

  gethrmssalaryemployeeannualincomesList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmssalaryemployeeannualincome').toPromise();
  }
  }
  getListByaiid(aiid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmssalaryemployeeannualincome'+'/aiid/'+aiid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmssalaryemployeeannualincome'+'/param/'+key).toPromise();
  }
  }


  gethrmssalaryemployeeannualincomesByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmssalaryemployeeannualincome'+'/e/'+id).toPromise();
  }
  }
  gethrmssalaryemployeeannualincomesByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmssalaryemployeeannualincome'+'/'+id).toPromise();
  }
  }

  deletehrmssalaryemployeeannualincome(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntirehrmsURL + '/hrmssalaryemployeeannualincome'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntirehrmsURL + '/hrmssalaryemployeeannualincome')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

