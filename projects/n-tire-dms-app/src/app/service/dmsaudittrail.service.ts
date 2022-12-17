import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { dmsaudittrail } from '../model/dmsaudittrail.model';
import { environment } from '../../environments/environment';
import { IdmsaudittrailResponse } from '../model/dmsaudittrail.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class dmsaudittrailService {
  formData: dmsaudittrail;
  readonly rootURL = AppConstants.baseURL;
  list: dmsaudittrail[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatedmsaudittrails():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntiredmsURL + '/dmsaudittrail', body);
  }
  }

  saveOrUpdatedmsaudittrailsList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntiredmsURL + '/dmsaudittrail', body);
  }
  }

  getdmsaudittrailsList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntiredmsURL + '/dmsaudittrail').toPromise();
  }
  }
  getListByaudittrailid(audittrailid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntiredmsURL + '/dmsaudittrail'+'/audittrailid/'+audittrailid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntiredmsURL + '/dmsaudittrail'+'/param/'+key).toPromise();
  }
  }


  getdmsaudittrailsByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntiredmsURL + '/dmsaudittrail'+'/e/'+id).toPromise();
  }
  }
  getdmsaudittrailsByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntiredmsURL + '/dmsaudittrail'+'/'+id).toPromise();
  }
  }

  deletedmsaudittrail(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntiredmsURL + '/dmsaudittrail'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntiredmsURL + '/dmsaudittrail')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

