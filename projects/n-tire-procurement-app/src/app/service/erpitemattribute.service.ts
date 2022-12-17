import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { erpitemattribute } from '../model/erpitemattribute.model';
import { environment } from '../../environments/environment';
import { IerpitemattributeResponse } from '../model/erpitemattribute.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class erpitemattributeService {
  formData: erpitemattribute;
  readonly rootURL = AppConstants.baseURL;
  list: erpitemattribute[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdateerpitemattributes():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntireprocurementURL + '/erpitemattribute', body);
  }
  }

  saveOrUpdateerpitemattributesList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntireprocurementURL + '/erpitemattribute', body);
  }
  }

  geterpitemattributesList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erpitemattribute').toPromise();
  }
  }
  getListByitemattributeid(itemattributeid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erpitemattribute'+'/itemattributeid/'+itemattributeid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erpitemattribute'+'/param/'+key).toPromise();
  }
  }


  geterpitemattributesByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erpitemattribute'+'/e/'+id).toPromise();
  }
  }
  geterpitemattributesByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erpitemattribute'+'/'+id).toPromise();
  }
  }

  deleteerpitemattribute(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntireprocurementURL + '/erpitemattribute'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntireprocurementURL + '/erpitemattribute')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

