import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { hrmsparesponse } from '../model/hrmsparesponse.model';
import { environment } from '../../environments/environment';
import { IhrmsparesponseResponse } from '../model/hrmsparesponse.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class hrmsparesponseService {
  formData: hrmsparesponse;
  readonly rootURL = AppConstants.baseURL;
  list: hrmsparesponse[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatehrmsparesponses():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntirehrmsURL + '/hrmsparesponse', body);
  }
  }

  saveOrUpdatehrmsparesponsesList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntirehrmsURL + '/hrmsparesponse', body);
  }
  }

  gethrmsparesponsesList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsparesponse').toPromise();
  }
  }
  getListByappraisalfeedbackid(appraisalfeedbackid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsparesponse'+'/appraisalfeedbackid/'+appraisalfeedbackid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsparesponse'+'/param/'+key).toPromise();
  }
  }


  gethrmsparesponsesByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsparesponse'+'/e/'+id).toPromise();
  }
  }
  gethrmsparesponsesByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsparesponse'+'/'+id).toPromise();
  }
  }

  deletehrmsparesponse(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntirehrmsURL + '/hrmsparesponse'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntirehrmsURL + '/hrmsparesponse')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

