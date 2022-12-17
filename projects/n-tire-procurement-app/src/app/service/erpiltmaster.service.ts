import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { erpiltmaster } from '../model/erpiltmaster.model';
import { erpiltdetail } from '../model/erpiltdetail.model';
import { environment } from '../../environments/environment';
import { IerpiltmasterResponse } from '../model/erpiltmaster.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class erpiltmasterService {
  formData: erpiltmaster;
  readonly rootURL = AppConstants.baseURL;
  list: erpiltmaster[];
  erpiltdetails: erpiltdetail[]=[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdateerpiltmasters():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
      erpiltdetails: this.erpiltdetails.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
    };
    return this.http.post(AppConstants.ntireprocurementURL + '/erpiltmaster', body);
  }
  }

  saveOrUpdateerpiltmastersList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntireprocurementURL + '/erpiltmaster', body);
  }
  }

  geterpiltmastersList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erpiltmaster').toPromise();
  }
  }
  getListByiltid(iltid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erpiltmaster'+'/iltid/'+iltid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erpiltmaster'+'/param/'+key).toPromise();
  }
  }


  geterpiltmastersByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erpiltmaster'+'/e/'+id).toPromise();
  }
  }
  geterpiltmastersByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erpiltmaster'+'/'+id).toPromise();
  }
  }

  deleteerpiltmaster(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntireprocurementURL + '/erpiltmaster'+'/'+id).toPromise();
  }
  }
clearList(){
this.erpiltdetails = [];
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntireprocurementURL + '/erpiltmaster')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

