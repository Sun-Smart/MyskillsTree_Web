import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { crmcustomerservice } from '../model/crmcustomerservice.model';
import { crmcustomerservicedetail } from '../model/crmcustomerservicedetail.model';
import { environment } from '../../environments/environment';
import { IcrmcustomerserviceResponse } from '../model/crmcustomerservice.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class crmcustomerserviceService {
  formData: crmcustomerservice;
  readonly rootURL = AppConstants.baseURL;
  list: crmcustomerservice[];
  crmcustomerservicedetails: crmcustomerservicedetail[]=[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatecrmcustomerservices():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
      crmcustomerservicedetails: this.crmcustomerservicedetails.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
    };
    return this.http.post(AppConstants.ntirecrmURL + '/crmcustomerservice', body);
  }
  }

  saveOrUpdatecrmcustomerservicesList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntirecrmURL + '/crmcustomerservice', body);
  }
  }

  getcrmcustomerservicesList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecrmURL + '/crmcustomerservice').toPromise();
  }
  }
  getListByserviceid(serviceid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecrmURL + '/crmcustomerservice'+'/serviceid/'+serviceid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecrmURL + '/crmcustomerservice'+'/param/'+key).toPromise();
  }
  }


  getcrmcustomerservicesByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecrmURL + '/crmcustomerservice'+'/e/'+id).toPromise();
  }
  }
  getcrmcustomerservicesByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecrmURL + '/crmcustomerservice'+'/'+id).toPromise();
  }
  }

  deletecrmcustomerservice(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntirecrmURL + '/crmcustomerservice'+'/'+id).toPromise();
  }
  }
clearList(){
this.crmcustomerservicedetails = [];
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntirecrmURL + '/crmcustomerservice')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

