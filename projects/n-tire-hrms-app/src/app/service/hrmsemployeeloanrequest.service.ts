import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { hrmsemployeeloanrequest } from '../model/hrmsemployeeloanrequest.model';
import { environment } from '../../environments/environment';
import { IhrmsemployeeloanrequestResponse } from '../model/hrmsemployeeloanrequest.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class hrmsemployeeloanrequestService {
  formData: hrmsemployeeloanrequest;
  readonly rootURL = AppConstants.baseURL;
  list: hrmsemployeeloanrequest[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatehrmsemployeeloanrequests():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntirehrmsURL + '/hrmsemployeeloanrequest', body);
  }
  }

  saveOrUpdatehrmsemployeeloanrequestsList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntirehrmsURL + '/hrmsemployeeloanrequest', body);
  }
  }

  gethrmsemployeeloanrequestsList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeeloanrequest').toPromise();
  }
  }
  getListByloanid(loanid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeeloanrequest'+'/loanid/'+loanid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeeloanrequest'+'/param/'+key).toPromise();
  }
  }


  gethrmsemployeeloanrequestsByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeeloanrequest'+'/e/'+id).toPromise();
  }
  }
  gethrmsemployeeloanrequestsByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeeloanrequest'+'/'+id).toPromise();
  }
  }

  deletehrmsemployeeloanrequest(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntirehrmsURL + '/hrmsemployeeloanrequest'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeeloanrequest')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

