import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { hrmsmprassign } from '../model/hrmsmprassign.model';
import { environment } from '../../environments/environment';
import { IhrmsmprassignResponse } from '../model/hrmsmprassign.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class hrmsmprassignService {
  formData: hrmsmprassign;
  readonly rootURL = AppConstants.baseURL;
  list: hrmsmprassign[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatehrmsmprassigns():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntirehrmsURL + '/hrmsmprassign', body);
  }
  }

  saveOrUpdatehrmsmprassignsList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntirehrmsURL + '/hrmsmprassign', body);
  }
  }

  gethrmsmprassignsList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsmprassign').toPromise();
  }
  }
  getListByassignid(assignid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsmprassign'+'/assignid/'+assignid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsmprassign'+'/param/'+key).toPromise();
  }
  }


  gethrmsmprassignsByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsmprassign'+'/e/'+id).toPromise();
  }
  }
  gethrmsmprassignsByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsmprassign'+'/'+id).toPromise();
  }
  }

  deletehrmsmprassign(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntirehrmsURL + '/hrmsmprassign'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntirehrmsURL + '/hrmsmprassign')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

