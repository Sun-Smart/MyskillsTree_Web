import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { erpfacustomerreceiptdetail } from '../model/erpfacustomerreceiptdetail.model';
import { environment } from '../../environments/environment';
import { IerpfacustomerreceiptdetailResponse } from '../model/erpfacustomerreceiptdetail.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class erpfacustomerreceiptdetailService {
  formData: erpfacustomerreceiptdetail;
  readonly rootURL = AppConstants.ntirefinanceURL;
  list: erpfacustomerreceiptdetail[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdateerpfacustomerreceiptdetails():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntirefinanceURL + '/erpfacustomerreceiptdetail', body);
  }
  }

  saveOrUpdateerpfacustomerreceiptdetailsList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntirefinanceURL + '/erpfacustomerreceiptdetail', body);
  }
  }

  geterpfacustomerreceiptdetailsList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirefinanceURL + '/erpfacustomerreceiptdetail').toPromise();
  }
  }
  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirefinanceURL + '/erpfacustomerreceiptdetail'+'/param/'+key).toPromise();
  }
  }


  geterpfacustomerreceiptdetailsByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirefinanceURL + '/erpfacustomerreceiptdetail'+'/e/'+id).toPromise();
  }
  }
  geterpfacustomerreceiptdetailsByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirefinanceURL + '/erpfacustomerreceiptdetail'+'/'+id).toPromise();
  }
  }

  deleteerpfacustomerreceiptdetail(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntirefinanceURL + '/erpfacustomerreceiptdetail'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntirefinanceURL + '/erpfacustomerreceiptdetail')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

