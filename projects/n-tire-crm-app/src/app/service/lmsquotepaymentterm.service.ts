import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lmsquotepaymentterm } from '../model/lmsquotepaymentterm.model';
import { environment } from '../../environments/environment';
import { IlmsquotepaymenttermResponse } from '../model/lmsquotepaymentterm.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class lmsquotepaymenttermService {
  formData: lmsquotepaymentterm;
  readonly rootURL = AppConstants.baseURL;
  list: lmsquotepaymentterm[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatelmsquotepaymentterms():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntirecrmURL + '/lmsquotepaymentterm', body);
  }
  }

  saveOrUpdatelmsquotepaymenttermsList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntirecrmURL + '/lmsquotepaymentterm', body);
  }
  }

  getlmsquotepaymenttermsList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecrmURL + '/lmsquotepaymentterm').toPromise();
  }
  }
  getListBypaymenttermid(paymenttermid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecrmURL + '/lmsquotepaymentterm'+'/paymenttermid/'+paymenttermid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecrmURL + '/lmsquotepaymentterm'+'/param/'+key).toPromise();
  }
  }


  getlmsquotepaymenttermsByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecrmURL + '/lmsquotepaymentterm'+'/e/'+id).toPromise();
  }
  }
  getlmsquotepaymenttermsByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecrmURL + '/lmsquotepaymentterm'+'/'+id).toPromise();
  }
  }

  deletelmsquotepaymentterm(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntirecrmURL + '/lmsquotepaymentterm'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntirecrmURL + '/lmsquotepaymentterm')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

