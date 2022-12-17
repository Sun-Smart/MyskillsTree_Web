import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { erpfachequestatus } from '../model/erpfachequestatus.model';
import { environment } from '../../environments/environment';
import { IerpfachequestatusResponse } from '../model/erpfachequestatus.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class erpfachequestatusService {
  formData: erpfachequestatus;
  readonly rootURL = AppConstants.ntirefinanceURL;
  list: erpfachequestatus[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdateerpfachequestatuses():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntirefinanceURL + '/erpfachequestatus', body);
  }
  }

  saveOrUpdateerpfachequestatusesList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntirefinanceURL + '/erpfachequestatus', body);
  }
  }

  geterpfachequestatusesList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirefinanceURL + '/erpfachequestatus').toPromise();
  }
  }
  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirefinanceURL + '/erpfachequestatus'+'/param/'+key).toPromise();
  }
  }


  geterpfachequestatusesByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirefinanceURL + '/erpfachequestatus'+'/e/'+id).toPromise();
  }
  }
  geterpfachequestatusesByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirefinanceURL + '/erpfachequestatus'+'/'+id).toPromise();
  }
  }

  deleteerpfachequestatus(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntirefinanceURL + '/erpfachequestatus'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntirefinanceURL + '/erpfachequestatus')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

