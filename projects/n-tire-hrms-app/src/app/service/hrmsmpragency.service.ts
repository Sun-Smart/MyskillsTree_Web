import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { hrmsmpragency } from '../model/hrmsmpragency.model';
import { environment } from '../../environments/environment';
import { IhrmsmpragencyResponse } from '../model/hrmsmpragency.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class hrmsmpragencyService {
  formData: hrmsmpragency;
  readonly rootURL = AppConstants.baseURL;
  list: hrmsmpragency[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatehrmsmpragencies():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntirehrmsURL + '/hrmsmpragency', body);
  }
  }

  saveOrUpdatehrmsmpragenciesList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntirehrmsURL + '/hrmsmpragency', body);
  }
  }

  gethrmsmpragenciesList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsmpragency').toPromise();
  }
  }
  getListByraassignid(raassignid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsmpragency'+'/raassignid/'+raassignid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsmpragency'+'/param/'+key).toPromise();
  }
  }


  gethrmsmpragenciesByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsmpragency'+'/e/'+id).toPromise();
  }
  }
  gethrmsmpragenciesByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsmpragency'+'/'+id).toPromise();
  }
  }

  deletehrmsmpragency(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntirehrmsURL + '/hrmsmpragency'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntirehrmsURL + '/hrmsmpragency')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

