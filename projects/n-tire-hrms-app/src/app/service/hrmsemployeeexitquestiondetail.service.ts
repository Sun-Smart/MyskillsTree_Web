import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { hrmsemployeeexitquestiondetail } from '../model/hrmsemployeeexitquestiondetail.model';
import { environment } from '../../environments/environment';
import { IhrmsemployeeexitquestiondetailResponse } from '../model/hrmsemployeeexitquestiondetail.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class hrmsemployeeexitquestiondetailService {
  formData: hrmsemployeeexitquestiondetail;
  readonly rootURL = AppConstants.baseURL;
  list: hrmsemployeeexitquestiondetail[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatehrmsemployeeexitquestiondetails():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntirehrmsURL + '/hrmsemployeeexitquestiondetail', body);
  }
  }

  saveOrUpdatehrmsemployeeexitquestiondetailsList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntirehrmsURL + '/hrmsemployeeexitquestiondetail', body);
  }
  }

  gethrmsemployeeexitquestiondetailsList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeeexitquestiondetail').toPromise();
  }
  }
  getListByexitquestiondetailid(exitquestiondetailid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeeexitquestiondetail'+'/exitquestiondetailid/'+exitquestiondetailid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeeexitquestiondetail'+'/param/'+key).toPromise();
  }
  }


  gethrmsemployeeexitquestiondetailsByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeeexitquestiondetail'+'/e/'+id).toPromise();
  }
  }
  gethrmsemployeeexitquestiondetailsByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeeexitquestiondetail'+'/'+id).toPromise();
  }
  }

  deletehrmsemployeeexitquestiondetail(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntirehrmsURL + '/hrmsemployeeexitquestiondetail'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeeexitquestiondetail')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

