import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { hrmsloanschememaster } from '../model/hrmsloanschememaster.model';
import { hrmsloanschemedetail } from '../model/hrmsloanschemedetail.model';
import { hrmsemployeeloanrequest } from '../model/hrmsemployeeloanrequest.model';
import { environment } from '../../environments/environment';
import { IhrmsloanschememasterResponse } from '../model/hrmsloanschememaster.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class hrmsloanschememasterService {
  formData: hrmsloanschememaster;
  readonly rootURL = AppConstants.baseURL;
  list: hrmsloanschememaster[];
  hrmsloanschemedetails: hrmsloanschemedetail[]=[];
  hrmsemployeeloanrequests: hrmsemployeeloanrequest[]=[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatehrmsloanschememasters():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
      hrmsloanschemedetails: this.hrmsloanschemedetails.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
      hrmsemployeeloanrequests: this.hrmsemployeeloanrequests.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
    };
    return this.http.post(AppConstants.ntirehrmsURL + '/hrmsloanschememaster', body);
  }
  }

  saveOrUpdatehrmsloanschememastersList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntirehrmsURL + '/hrmsloanschememaster', body);
  }
  }

  gethrmsloanschememastersList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsloanschememaster').toPromise();
  }
  }
  getListByschemeid(schemeid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsloanschememaster'+'/schemeid/'+schemeid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsloanschememaster'+'/param/'+key).toPromise();
  }
  }


  gethrmsloanschememastersByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsloanschememaster'+'/e/'+id).toPromise();
  }
  }
  gethrmsloanschememastersByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsloanschememaster'+'/'+id).toPromise();
  }
  }

  deletehrmsloanschememaster(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntirehrmsURL + '/hrmsloanschememaster'+'/'+id).toPromise();
  }
  }
clearList(){
this.hrmsloanschemedetails = [];
this.hrmsemployeeloanrequests = [];
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntirehrmsURL + '/hrmsloanschememaster')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

