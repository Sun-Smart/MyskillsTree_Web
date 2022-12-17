import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { erpsupplierresponse } from '../model/erpsupplierresponse.model';
import { environment } from '../../environments/environment';
import { IerpsupplierresponseResponse } from '../model/erpsupplierresponse.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class erpsupplierresponseService {
  formData: erpsupplierresponse;
  readonly rootURL = AppConstants.baseURL;
  list: erpsupplierresponse[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdateerpsupplierresponses():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntireprocurementURL + '/erpsupplierresponse', body);
  }
  }

  saveOrUpdateerpsupplierresponsesList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntireprocurementURL + '/erpsupplierresponse', body);
  }
  }

  geterpsupplierresponsesList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erpsupplierresponse').toPromise();
  }
  }
  getListByresponseid(responseid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erpsupplierresponse'+'/responseid/'+responseid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erpsupplierresponse'+'/param/'+key).toPromise();
  }
  }


  geterpsupplierresponsesByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erpsupplierresponse'+'/e/'+id).toPromise();
  }
  }
  geterpsupplierresponsesByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erpsupplierresponse'+'/'+id).toPromise();
  }
  }

  deleteerpsupplierresponse(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntireprocurementURL + '/erpsupplierresponse'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntireprocurementURL + '/erpsupplierresponse')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

