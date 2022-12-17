import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { prjprojectteammember } from '../model/prjprojectteammember.model';
import { environment } from '../../environments/environment';
import { IprjprojectteammemberResponse } from '../model/prjprojectteammember.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class prjprojectteammemberService {
  formData: prjprojectteammember;
  readonly rootURL = AppConstants.baseURL;
  list: prjprojectteammember[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdateprjprojectteammembers():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntireprojectURL + '/prjprojectteammember', body);
  }
  }

  saveOrUpdateprjprojectteammembersList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntireprojectURL + '/prjprojectteammember', body);
  }
  }

  getprjprojectteammembersList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprojectURL + '/prjprojectteammember').toPromise();
  }
  }
  getListByteammemberid(teammemberid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprojectURL + '/prjprojectteammember'+'/teammemberid/'+teammemberid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprojectURL + '/prjprojectteammember'+'/param/'+key).toPromise();
  }
  }


  getprjprojectteammembersByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprojectURL + '/prjprojectteammember'+'/e/'+id).toPromise();
  }
  }
  getprjprojectteammembersByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprojectURL + '/prjprojectteammember'+'/'+id).toPromise();
  }
  }

  deleteprjprojectteammember(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntireprojectURL + '/prjprojectteammember'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntireprojectURL + '/prjprojectteammember')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

