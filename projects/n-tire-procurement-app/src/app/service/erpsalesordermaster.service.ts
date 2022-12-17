import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { erpsalesordermaster } from '../model/erpsalesordermaster.model';
import { erpsalesorderdetail } from '../model/erpsalesorderdetail.model';
import { erpsalesorderpaymentterm } from '../model/erpsalesorderpaymentterm.model';
import { environment } from '../../environments/environment';
import { IerpsalesordermasterResponse } from '../model/erpsalesordermaster.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class erpsalesordermasterService {
  formData: erpsalesordermaster;
  readonly rootURL = AppConstants.baseURL;
  list: erpsalesordermaster[];
  erpsalesorderdetails: erpsalesorderdetail[]=[];
  erpsalesorderpaymentterms: erpsalesorderpaymentterm[]=[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdateerpsalesordermasters():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
      erpsalesorderdetails: this.erpsalesorderdetails.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
      erpsalesorderpaymentterms: this.erpsalesorderpaymentterms.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
    };
    return this.http.post(AppConstants.ntireprocurementURL + '/erpsalesordermaster', body);
  }
  }

  saveOrUpdateerpsalesordermastersList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntireprocurementURL + '/erpsalesordermaster', body);
  }
  }

  geterpsalesordermastersList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erpsalesordermaster').toPromise();
  }
  }
  getListBysoid(soid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erpsalesordermaster'+'/soid/'+soid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erpsalesordermaster'+'/param/'+key).toPromise();
  }
  }


  geterpsalesordermastersByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erpsalesordermaster'+'/e/'+id).toPromise();
  }
  }
  geterpsalesordermastersByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erpsalesordermaster'+'/'+id).toPromise();
  }
  }

  deleteerpsalesordermaster(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntireprocurementURL + '/erpsalesordermaster'+'/'+id).toPromise();
  }
  }
clearList(){
this.erpsalesorderdetails = [];
this.erpsalesorderpaymentterms = [];
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntireprocurementURL + '/erpsalesordermaster')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

