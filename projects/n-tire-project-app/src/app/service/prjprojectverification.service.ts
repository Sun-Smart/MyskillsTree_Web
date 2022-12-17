import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { prjprojectverification } from '../model/prjprojectverification.model';
import { environment } from '../../environments/environment';
import { IprjprojectverificationResponse } from '../model/prjprojectverification.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class prjprojectverificationService {
  formData: prjprojectverification;
  readonly rootURL = AppConstants.baseURL;
  list: prjprojectverification[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdateprjprojectverifications():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntireprojectURL + '/prjprojectverification', body);
  }
  }

  saveOrUpdateprjprojectverificationsList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntireprojectURL + '/prjprojectverification', body);
  }
  }

  getprjprojectverificationsList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprojectURL + '/prjprojectverification').toPromise();
  }
  }
  getListByverificationid(verificationid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprojectURL + '/prjprojectverification'+'/verificationid/'+verificationid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprojectURL + '/prjprojectverification'+'/param/'+key).toPromise();
  }
  }


  getprjprojectverificationsByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprojectURL + '/prjprojectverification'+'/e/'+id).toPromise();
  }
  }
  getprjprojectverificationsByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprojectURL + '/prjprojectverification'+'/'+id).toPromise();
  }
  }

  deleteprjprojectverification(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntireprojectURL + '/prjprojectverification'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntireprojectURL + '/prjprojectverification')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

