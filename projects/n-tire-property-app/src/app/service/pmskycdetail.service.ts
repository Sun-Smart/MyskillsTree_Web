import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { pmskycdetail } from '../model/pmskycdetail.model';
import { environment } from '../../environments/environment';
import { IpmskycdetailResponse } from '../model/pmskycdetail.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class pmskycdetailService {
  formData: pmskycdetail;
  readonly rootURL = AppConstants.baseURL;
  list: pmskycdetail[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatepmskycdetails():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntirepropertyURL + '/pmskycdetail', body);
  }
  }

  saveOrUpdatepmskycdetailsList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntirepropertyURL + '/pmskycdetail', body);
  }
  }

  getpmskycdetailsList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirepropertyURL + '/pmskycdetail').toPromise();
  }
  }
  getListBykycid(kycid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirepropertyURL + '/pmskycdetail'+'/kycid/'+kycid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirepropertyURL + '/pmskycdetail'+'/param/'+key).toPromise();
  }
  }


  getpmskycdetailsByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirepropertyURL + '/pmskycdetail'+'/e/'+id).toPromise();
  }
  }
  getpmskycdetailsByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirepropertyURL + '/pmskycdetail'+'/'+id).toPromise();
  }
  }

  deletepmskycdetail(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntirepropertyURL + '/pmskycdetail'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntirepropertyURL + '/pmskycdetail')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

