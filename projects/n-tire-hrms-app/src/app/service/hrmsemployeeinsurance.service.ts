import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { hrmsemployeeinsurance } from '../model/hrmsemployeeinsurance.model';
import { environment } from '../../environments/environment';
import { IhrmsemployeeinsuranceResponse } from '../model/hrmsemployeeinsurance.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class hrmsemployeeinsuranceService {
  formData: hrmsemployeeinsurance;
  readonly rootURL = AppConstants.baseURL;
  list: hrmsemployeeinsurance[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatehrmsemployeeinsurances():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntirehrmsURL + '/hrmsemployeeinsurance', body);
  }
  }

  saveOrUpdatehrmsemployeeinsurancesList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntirehrmsURL + '/hrmsemployeeinsurance', body);
  }
  }

  gethrmsemployeeinsurancesList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeeinsurance').toPromise();
  }
  }
  getListByinsuranceid(insuranceid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeeinsurance'+'/insuranceid/'+insuranceid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeeinsurance'+'/param/'+key).toPromise();
  }
  }


  gethrmsemployeeinsurancesByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeeinsurance'+'/e/'+id).toPromise();
  }
  }
  gethrmsemployeeinsurancesByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeeinsurance'+'/'+id).toPromise();
  }
  }

  deletehrmsemployeeinsurance(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntirehrmsURL + '/hrmsemployeeinsurance'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeeinsurance')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

