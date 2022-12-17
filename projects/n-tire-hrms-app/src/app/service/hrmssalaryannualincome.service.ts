import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { hrmssalaryannualincome } from '../model/hrmssalaryannualincome.model';
import { environment } from '../../environments/environment';
import { IhrmssalaryannualincomeResponse } from '../model/hrmssalaryannualincome.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class hrmssalaryannualincomeService {
  formData: hrmssalaryannualincome;
  readonly rootURL = AppConstants.baseURL;
  list: hrmssalaryannualincome[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatehrmssalaryannualincomes():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntirehrmsURL + '/hrmssalaryannualincome', body);
  }
  }

  saveOrUpdatehrmssalaryannualincomesList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntirehrmsURL + '/hrmssalaryannualincome', body);
  }
  }

  gethrmssalaryannualincomesList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmssalaryannualincome').toPromise();
  }
  }
  getListByaiid(aiid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmssalaryannualincome'+'/aiid/'+aiid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmssalaryannualincome'+'/param/'+key).toPromise();
  }
  }


  gethrmssalaryannualincomesByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmssalaryannualincome'+'/e/'+id).toPromise();
  }
  }
  gethrmssalaryannualincomesByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmssalaryannualincome'+'/'+id).toPromise();
  }
  }

  deletehrmssalaryannualincome(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntirehrmsURL + '/hrmssalaryannualincome'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntirehrmsURL + '/hrmssalaryannualincome')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

