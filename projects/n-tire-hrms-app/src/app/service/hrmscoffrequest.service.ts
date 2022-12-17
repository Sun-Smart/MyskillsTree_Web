import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { hrmscoffrequest } from '../model/hrmscoffrequest.model';
import { environment } from '../../environments/environment';
import { IhrmscoffrequestResponse } from '../model/hrmscoffrequest.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class hrmscoffrequestService {
  formData: hrmscoffrequest;
  readonly rootURL = AppConstants.baseURL;
  list: hrmscoffrequest[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatehrmscoffrequests():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntirehrmsURL + '/hrmscoffrequest', body);
  }
  }

  saveOrUpdatehrmscoffrequestsList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntirehrmsURL + '/hrmscoffrequest', body);
  }
  }

  gethrmscoffrequestsList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmscoffrequest').toPromise();
  }
  }
  getListBycoffid(coffid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmscoffrequest'+'/coffid/'+coffid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmscoffrequest'+'/param/'+key).toPromise();
  }
  }


  gethrmscoffrequestsByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmscoffrequest'+'/e/'+id).toPromise();
  }
  }
  gethrmscoffrequestsByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmscoffrequest'+'/'+id).toPromise();
  }
  }

  deletehrmscoffrequest(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntirehrmsURL + '/hrmscoffrequest'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntirehrmsURL + '/hrmscoffrequest')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

