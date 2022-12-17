import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { hrmsemployerchecklistconfigmaster } from '../model/hrmsemployerchecklistconfigmaster.model';
import { environment } from '../../environments/environment';
import { IhrmsemployerchecklistconfigmasterResponse } from '../model/hrmsemployerchecklistconfigmaster.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class hrmsemployerchecklistconfigmasterService {
  formData: hrmsemployerchecklistconfigmaster;
  readonly rootURL = AppConstants.baseURL;
  list: hrmsemployerchecklistconfigmaster[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatehrmsemployerchecklistconfigmasters():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntirehrmsURL + '/hrmsemployerchecklistconfigmaster', body);
  }
  }

  saveOrUpdatehrmsemployerchecklistconfigmastersList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntirehrmsURL + '/hrmsemployerchecklistconfigmaster', body);
  }
  }

  gethrmsemployerchecklistconfigmastersList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployerchecklistconfigmaster').toPromise();
  }
  }
  getListByecheckid(echeckid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployerchecklistconfigmaster'+'/echeckid/'+echeckid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployerchecklistconfigmaster'+'/param/'+key).toPromise();
  }
  }


  gethrmsemployerchecklistconfigmastersByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployerchecklistconfigmaster'+'/e/'+id).toPromise();
  }
  }
  gethrmsemployerchecklistconfigmastersByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployerchecklistconfigmaster'+'/'+id).toPromise();
  }
  }

  deletehrmsemployerchecklistconfigmaster(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntirehrmsURL + '/hrmsemployerchecklistconfigmaster'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployerchecklistconfigmaster')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

