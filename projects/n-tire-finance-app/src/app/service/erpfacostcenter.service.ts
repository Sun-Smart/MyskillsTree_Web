import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { erpfacostcenter } from '../model/erpfacostcenter.model';
import { environment } from '../../environments/environment';
import { IerpfacostcenterResponse } from '../model/erpfacostcenter.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class erpfacostcenterService {
  formData: erpfacostcenter;
  readonly rootURL = AppConstants.baseURL;
  list: erpfacostcenter[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdateerpfacostcenters():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntirefinanceURL + '/erpfacostcenter', body);
  }
  }

  saveOrUpdateerpfacostcentersList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntirefinanceURL + '/erpfacostcenter', body);
  }
  }

  geterpfacostcentersList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirefinanceURL + '/erpfacostcenter').toPromise();
  }
  }
  getListBycostcenterid(costcenterid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirefinanceURL + '/erpfacostcenter'+'/costcenterid/'+costcenterid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirefinanceURL + '/erpfacostcenter'+'/param/'+key).toPromise();
  }
  }


  geterpfacostcentersByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirefinanceURL + '/erpfacostcenter'+'/e/'+id).toPromise();
  }
  }
  geterpfacostcentersByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirefinanceURL + '/erpfacostcenter'+'/'+id).toPromise();
  }
  }

  deleteerpfacostcenter(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntirefinanceURL + '/erpfacostcenter'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntirefinanceURL + '/erpfacostcenter')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

