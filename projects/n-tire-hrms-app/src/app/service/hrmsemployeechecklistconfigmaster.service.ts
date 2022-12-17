import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { hrmsemployeechecklistconfigmaster } from '../model/hrmsemployeechecklistconfigmaster.model';
import { environment } from '../../environments/environment';
import { IhrmsemployeechecklistconfigmasterResponse } from '../model/hrmsemployeechecklistconfigmaster.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class hrmsemployeechecklistconfigmasterService {
  formData: hrmsemployeechecklistconfigmaster;
  readonly rootURL = AppConstants.baseURL;
  list: hrmsemployeechecklistconfigmaster[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatehrmsemployeechecklistconfigmasters():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntirehrmsURL + '/hrmsemployeechecklistconfigmaster', body);
  }
  }

  saveOrUpdatehrmsemployeechecklistconfigmastersList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntirehrmsURL + '/hrmsemployeechecklistconfigmaster', body);
  }
  }

  gethrmsemployeechecklistconfigmastersList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeechecklistconfigmaster').toPromise();
  }
  }
  getListBycheckid(checkid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeechecklistconfigmaster'+'/checkid/'+checkid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeechecklistconfigmaster'+'/param/'+key).toPromise();
  }
  }


  gethrmsemployeechecklistconfigmastersByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeechecklistconfigmaster'+'/e/'+id).toPromise();
  }
  }
  gethrmsemployeechecklistconfigmastersByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeechecklistconfigmaster'+'/'+id).toPromise();
  }
  }

  deletehrmsemployeechecklistconfigmaster(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntirehrmsURL + '/hrmsemployeechecklistconfigmaster'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeechecklistconfigmaster')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

