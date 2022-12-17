import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { erpqcmaster } from '../model/erpqcmaster.model';
import { erpqcdetail } from '../model/erpqcdetail.model';
import { environment } from '../../environments/environment';
import { IerpqcmasterResponse } from '../model/erpqcmaster.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class erpqcmasterService {
  formData: erpqcmaster;
  readonly rootURL = AppConstants.baseURL;
  list: erpqcmaster[];
  erpqcdetails: erpqcdetail[]=[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdateerpqcmasters():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
      erpqcdetails: this.erpqcdetails.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
    };
    return this.http.post(AppConstants.ntireprocurementURL + '/erpqcmaster', body);
  }
  }

  saveOrUpdateerpqcmastersList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntireprocurementURL + '/erpqcmaster', body);
  }
  }

  geterpqcmastersList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erpqcmaster').toPromise();
  }
  }
  getListByqcid(qcid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erpqcmaster'+'/qcid/'+qcid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erpqcmaster'+'/param/'+key).toPromise();
  }
  }


  geterpqcmastersByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erpqcmaster'+'/e/'+id).toPromise();
  }
  }
  geterpqcmastersByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erpqcmaster'+'/'+id).toPromise();
  }
  }

  deleteerpqcmaster(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntireprocurementURL + '/erpqcmaster'+'/'+id).toPromise();
  }
  }
clearList(){
this.erpqcdetails = [];
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntireprocurementURL + '/erpqcmaster')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

