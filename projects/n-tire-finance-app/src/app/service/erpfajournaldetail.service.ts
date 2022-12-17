import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { erpfajournaldetail } from '../model/erpfajournaldetail.model';
import { environment } from '../../environments/environment';
import { IerpfajournaldetailResponse } from '../model/erpfajournaldetail.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class erpfajournaldetailService {
  formData: erpfajournaldetail;
  readonly rootURL = AppConstants.ntirefinanceURL;
  list: erpfajournaldetail[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdateerpfajournaldetails():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntirefinanceURL + '/erpfajournaldetail', body);
  }
  }

  saveOrUpdateerpfajournaldetailsList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntirefinanceURL + '/erpfajournaldetail', body);
  }
  }

  geterpfajournaldetailsList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirefinanceURL + '/erpfajournaldetail').toPromise();
  }
  }
  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirefinanceURL + '/erpfajournaldetail'+'/param/'+key).toPromise();
  }
  }


  geterpfajournaldetailsByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirefinanceURL + '/erpfajournaldetail'+'/e/'+id).toPromise();
  }
  }
  geterpfajournaldetailsByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirefinanceURL + '/erpfajournaldetail'+'/'+id).toPromise();
  }
  }

  deleteerpfajournaldetail(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntirefinanceURL + '/erpfajournaldetail'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntirefinanceURL + '/erpfajournaldetail')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

