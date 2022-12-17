import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { hrmsloanschemedetail } from '../model/hrmsloanschemedetail.model';
import { environment } from '../../environments/environment';
import { IhrmsloanschemedetailResponse } from '../model/hrmsloanschemedetail.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class hrmsloanschemedetailService {
  formData: hrmsloanschemedetail;
  readonly rootURL = AppConstants.baseURL;
  list: hrmsloanschemedetail[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatehrmsloanschemedetails():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntirehrmsURL + '/hrmsloanschemedetail', body);
  }
  }

  saveOrUpdatehrmsloanschemedetailsList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntirehrmsURL + '/hrmsloanschemedetail', body);
  }
  }

  gethrmsloanschemedetailsList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsloanschemedetail').toPromise();
  }
  }
  getListBydetailid(detailid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsloanschemedetail'+'/detailid/'+detailid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsloanschemedetail'+'/param/'+key).toPromise();
  }
  }


  gethrmsloanschemedetailsByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsloanschemedetail'+'/e/'+id).toPromise();
  }
  }
  gethrmsloanschemedetailsByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsloanschemedetail'+'/'+id).toPromise();
  }
  }

  deletehrmsloanschemedetail(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntirehrmsURL + '/hrmsloanschemedetail'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntirehrmsURL + '/hrmsloanschemedetail')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

