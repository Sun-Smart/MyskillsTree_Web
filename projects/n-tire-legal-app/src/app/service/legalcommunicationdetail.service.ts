import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { legalcommunicationdetail } from '../model/legalcommunicationdetail.model';
import { environment } from '../../environments/environment';
import { IlegalcommunicationdetailResponse } from '../model/legalcommunicationdetail.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class legalcommunicationdetailService {
  formData: legalcommunicationdetail;
  readonly rootURL = AppConstants.baseURL;
  list: legalcommunicationdetail[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatelegalcommunicationdetails():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntirelegalURL + '/legalcommunicationdetail', body);
  }
  }

  saveOrUpdatelegalcommunicationdetailsList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntirelegalURL + '/legalcommunicationdetail', body);
  }
  }

  getlegalcommunicationdetailsList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirelegalURL + '/legalcommunicationdetail').toPromise();
  }
  }
  getListBycommunicationid(communicationid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirelegalURL + '/legalcommunicationdetail'+'/communicationid/'+communicationid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirelegalURL + '/legalcommunicationdetail'+'/param/'+key).toPromise();
  }
  }


  getlegalcommunicationdetailsByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirelegalURL + '/legalcommunicationdetail'+'/e/'+id).toPromise();
  }
  }
  getlegalcommunicationdetailsByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirelegalURL + '/legalcommunicationdetail'+'/'+id).toPromise();
  }
  }

  deletelegalcommunicationdetail(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntirelegalURL + '/legalcommunicationdetail'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntirelegalURL + '/legalcommunicationdetail')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

