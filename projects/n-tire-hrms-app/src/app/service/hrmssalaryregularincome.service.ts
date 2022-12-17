import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { hrmssalaryregularincome } from '../model/hrmssalaryregularincome.model';
import { environment } from '../../environments/environment';
import { IhrmssalaryregularincomeResponse } from '../model/hrmssalaryregularincome.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class hrmssalaryregularincomeService {
  formData: hrmssalaryregularincome;
  readonly rootURL = AppConstants.baseURL;
  list: hrmssalaryregularincome[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatehrmssalaryregularincomes():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntirehrmsURL + '/hrmssalaryregularincome', body);
  }
  }

  saveOrUpdatehrmssalaryregularincomesList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntirehrmsURL + '/hrmssalaryregularincome', body);
  }
  }

  gethrmssalaryregularincomesList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmssalaryregularincome').toPromise();
  }
  }
  getListByriid(riid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmssalaryregularincome'+'/riid/'+riid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmssalaryregularincome'+'/param/'+key).toPromise();
  }
  }


  gethrmssalaryregularincomesByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmssalaryregularincome'+'/e/'+id).toPromise();
  }
  }
  gethrmssalaryregularincomesByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmssalaryregularincome'+'/'+id).toPromise();
  }
  }

  deletehrmssalaryregularincome(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntirehrmsURL + '/hrmssalaryregularincome'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntirehrmsURL + '/hrmssalaryregularincome')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

