import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { erptendersupplierresponse } from '../model/erptendersupplierresponse.model';
import { erptendersuppliercomplianceresponse } from '../model/erptendersuppliercomplianceresponse.model';
import { erptendersupplierresponsedetail } from '../model/erptendersupplierresponsedetail.model';
import { environment } from '../../environments/environment';
import { IerptendersupplierresponseResponse } from '../model/erptendersupplierresponse.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class erptendersupplierresponseService {
  formData: erptendersupplierresponse;
  readonly rootURL = AppConstants.baseURL;
  list: erptendersupplierresponse[];
  erptendersuppliercomplianceresponses: erptendersuppliercomplianceresponse[]=[];
  erptendersupplierresponsedetails: erptendersupplierresponsedetail[]=[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdateerptendersupplierresponses():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
      erptendersuppliercomplianceresponses: this.erptendersuppliercomplianceresponses.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
      erptendersupplierresponsedetails: this.erptendersupplierresponsedetails.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
    };
    return this.http.post(AppConstants.ntireprocurementURL + '/erptendersupplierresponse', body);
  }
  }

  saveOrUpdateerptendersupplierresponsesList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntireprocurementURL + '/erptendersupplierresponse', body);
  }
  }

  geterptendersupplierresponsesList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erptendersupplierresponse').toPromise();
  }
  }
  getListByresponseid(responseid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erptendersupplierresponse'+'/responseid/'+responseid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erptendersupplierresponse'+'/param/'+key).toPromise();
  }
  }


  geterptendersupplierresponsesByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erptendersupplierresponse'+'/e/'+id).toPromise();
  }
  }
  geterptendersupplierresponsesByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erptendersupplierresponse'+'/'+id).toPromise();
  }
  }

  deleteerptendersupplierresponse(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntireprocurementURL + '/erptendersupplierresponse'+'/'+id).toPromise();
  }
  }
clearList(){
this.erptendersuppliercomplianceresponses = [];
this.erptendersupplierresponsedetails = [];
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntireprocurementURL + '/erptendersupplierresponse')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

