import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { erpfacustomerreceipt } from '../model/erpfacustomerreceipt.model';
import { erpfacustomerreceiptdetail } from '../model/erpfacustomerreceiptdetail.model';
import { environment } from '../../environments/environment';
import { IerpfacustomerreceiptResponse } from '../model/erpfacustomerreceipt.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class erpfacustomerreceiptService {
  formData: erpfacustomerreceipt;
  readonly rootURL = AppConstants.ntirefinanceURL;
  erpfacustomerreceiptdetails: erpfacustomerreceiptdetail[]=[];
  list: erpfacustomerreceipt[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdateerpfacustomerreceipts():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
      erpfacustomerreceiptdetails: this.erpfacustomerreceiptdetails.filter(function(el) { return el!=undefined && Object.keys(el).length!=0; }),
    };
    return this.http.post(AppConstants.ntirefinanceURL + '/erpfacustomerreceipt', body);
  }
  }

  saveOrUpdateerpfacustomerreceiptsList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntirefinanceURL + '/erpfacustomerreceipt', body);
  }
  }

  geterpfacustomerreceiptsList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirefinanceURL + '/erpfacustomerreceipt').toPromise();
  }
  }
  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirefinanceURL + '/erpfacustomerreceipt'+'/param/'+key).toPromise();
  }
  }


  geterpfacustomerreceiptsByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirefinanceURL + '/erpfacustomerreceipt'+'/e/'+id).toPromise();
  }
  }
  geterpfacustomerreceiptsByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirefinanceURL + '/erpfacustomerreceipt'+'/'+id).toPromise();
  }
  }

  deleteerpfacustomerreceipt(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntirefinanceURL + '/erpfacustomerreceipt'+'/'+id).toPromise();
  }
  }
clearList(){
this.erpfacustomerreceiptdetails = [];
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntirefinanceURL + '/erpfacustomerreceipt')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

