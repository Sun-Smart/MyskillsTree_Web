import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { hrmsemployeeeosdetail } from '../model/hrmsemployeeeosdetail.model';
import { environment } from '../../environments/environment';
import { IhrmsemployeeeosdetailResponse } from '../model/hrmsemployeeeosdetail.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class hrmsemployeeeosdetailService {
  formData: hrmsemployeeeosdetail;
  readonly rootURL = AppConstants.baseURL;
  list: hrmsemployeeeosdetail[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatehrmsemployeeeosdetails():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntirehrmsURL + '/hrmsemployeeeosdetail', body);
  }
  }

  saveOrUpdatehrmsemployeeeosdetailsList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntirehrmsURL + '/hrmsemployeeeosdetail', body);
  }
  }

  gethrmsemployeeeosdetailsList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeeeosdetail').toPromise();
  }
  }
  getListByemployeeeosid(employeeeosid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeeeosdetail'+'/employeeeosid/'+employeeeosid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeeeosdetail'+'/param/'+key).toPromise();
  }
  }


  gethrmsemployeeeosdetailsByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeeeosdetail'+'/e/'+id).toPromise();
  }
  }
  gethrmsemployeeeosdetailsByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeeeosdetail'+'/'+id).toPromise();
  }
  }

  deletehrmsemployeeeosdetail(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntirehrmsURL + '/hrmsemployeeeosdetail'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeeeosdetail')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

