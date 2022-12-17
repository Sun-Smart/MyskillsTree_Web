import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { pmsownerkycdetail } from '../model/pmsownerkycdetail.model';
import { environment } from '../../environments/environment';
import { IpmsownerkycdetailResponse } from '../model/pmsownerkycdetail.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class pmsownerkycdetailService {
  formData: pmsownerkycdetail;
  readonly rootURL = AppConstants.baseURL;
  list: pmsownerkycdetail[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatepmsownerkycdetails():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntirepropertyURL + '/pmsownerkycdetail', body);
  }
  }

  saveOrUpdatepmsownerkycdetailsList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntirepropertyURL + '/pmsownerkycdetail', body);
  }
  }

  getpmsownerkycdetailsList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirepropertyURL + '/pmsownerkycdetail').toPromise();
  }
  }
  getListBykycid(kycid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirepropertyURL + '/pmsownerkycdetail'+'/kycid/'+kycid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirepropertyURL + '/pmsownerkycdetail'+'/param/'+key).toPromise();
  }
  }


  getpmsownerkycdetailsByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirepropertyURL + '/pmsownerkycdetail'+'/e/'+id).toPromise();
  }
  }
  getpmsownerkycdetailsByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirepropertyURL + '/pmsownerkycdetail'+'/'+id).toPromise();
  }
  }

  deletepmsownerkycdetail(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntirepropertyURL + '/pmsownerkycdetail'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntirepropertyURL + '/pmsownerkycdetail')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

