import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { erpitembundle } from '../model/erpitembundle.model';
import { erpitembundledetail } from '../model/erpitembundledetail.model';
import { environment } from '../../environments/environment';
import { IerpitembundleResponse } from '../model/erpitembundle.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class erpitembundleService {
  formData: erpitembundle;
  readonly rootURL = AppConstants.baseURL;
  list: erpitembundle[];
  erpitembundledetails: erpitembundledetail[]=[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdateerpitembundles():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
      erpitembundledetails: this.erpitembundledetails.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
    };
    return this.http.post(AppConstants.ntireprocurementURL + '/erpitembundle', body);
  }
  }

  saveOrUpdateerpitembundlesList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntireprocurementURL + '/erpitembundle', body);
  }
  }

  geterpitembundlesList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erpitembundle').toPromise();
  }
  }
  getListBybundleid(bundleid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erpitembundle'+'/bundleid/'+bundleid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erpitembundle'+'/param/'+key).toPromise();
  }
  }


  geterpitembundlesByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erpitembundle'+'/e/'+id).toPromise();
  }
  }
  geterpitembundlesByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erpitembundle'+'/'+id).toPromise();
  }
  }

  deleteerpitembundle(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntireprocurementURL + '/erpitembundle'+'/'+id).toPromise();
  }
  }
clearList(){
this.erpitembundledetails = [];
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntireprocurementURL + '/erpitembundle')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

