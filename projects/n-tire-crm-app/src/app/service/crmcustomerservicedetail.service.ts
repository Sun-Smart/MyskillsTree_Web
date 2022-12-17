import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { crmcustomerservicedetail } from '../model/crmcustomerservicedetail.model';
import { environment } from '../../environments/environment';
import { IcrmcustomerservicedetailResponse } from '../model/crmcustomerservicedetail.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class crmcustomerservicedetailService {
  formData: crmcustomerservicedetail;
  readonly rootURL = AppConstants.baseURL;
  list: crmcustomerservicedetail[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatecrmcustomerservicedetails():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntirecrmURL + '/crmcustomerservicedetail', body);
  }
  }

  saveOrUpdatecrmcustomerservicedetailsList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntirecrmURL + '/crmcustomerservicedetail', body);
  }
  }

  getcrmcustomerservicedetailsList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecrmURL + '/crmcustomerservicedetail').toPromise();
  }
  }
  getListBydetailid(detailid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecrmURL + '/crmcustomerservicedetail'+'/detailid/'+detailid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecrmURL + '/crmcustomerservicedetail'+'/param/'+key).toPromise();
  }
  }


  getcrmcustomerservicedetailsByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecrmURL + '/crmcustomerservicedetail'+'/e/'+id).toPromise();
  }
  }
  getcrmcustomerservicedetailsByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecrmURL + '/crmcustomerservicedetail'+'/'+id).toPromise();
  }
  }

  deletecrmcustomerservicedetail(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntirecrmURL + '/crmcustomerservicedetail'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntirecrmURL + '/crmcustomerservicedetail')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

