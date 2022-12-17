import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { crmtatconfiguration } from '../model/crmtatconfiguration.model';
import { environment } from '../../environments/environment';
import { IcrmtatconfigurationResponse } from '../model/crmtatconfiguration.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class crmtatconfigurationService {
  formData: crmtatconfiguration;
  readonly rootURL = AppConstants.baseURL;
  list: crmtatconfiguration[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatecrmtatconfigurations():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntirecrmURL + '/crmtatconfiguration', body);
  }
  }

  saveOrUpdatecrmtatconfigurationsList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntirecrmURL + '/crmtatconfiguration', body);
  }
  }

  getcrmtatconfigurationsList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecrmURL + '/crmtatconfiguration').toPromise();
  }
  }
  getListByconfigid(configid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecrmURL + '/crmtatconfiguration'+'/configid/'+configid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecrmURL + '/crmtatconfiguration'+'/param/'+key).toPromise();
  }
  }


  getcrmtatconfigurationsByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecrmURL + '/crmtatconfiguration'+'/e/'+id).toPromise();
  }
  }
  getcrmtatconfigurationsByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecrmURL + '/crmtatconfiguration'+'/'+id).toPromise();
  }
  }

  deletecrmtatconfiguration(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntirecrmURL + '/crmtatconfiguration'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntirecrmURL + '/crmtatconfiguration')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

