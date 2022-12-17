import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { legalcasepartydetail } from '../model/legalcasepartydetail.model';
import { environment } from '../../environments/environment';
import { IlegalcasepartydetailResponse } from '../model/legalcasepartydetail.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class legalcasepartydetailService {
  formData: legalcasepartydetail;
  readonly rootURL = AppConstants.baseURL;
  list: legalcasepartydetail[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatelegalcasepartydetails():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntirelegalURL + '/legalcasepartydetail', body);
  }
  }

  saveOrUpdatelegalcasepartydetailsList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntirelegalURL + '/legalcasepartydetail', body);
  }
  }

  getlegalcasepartydetailsList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirelegalURL + '/legalcasepartydetail').toPromise();
  }
  }
  getListBypartyid(partyid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirelegalURL + '/legalcasepartydetail'+'/partyid/'+partyid).toPromise();
  }
  }

  getListBypartytype(partytype:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirelegalURL + '/legalcasepartydetail'+'/partytype/'+partytype).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirelegalURL + '/legalcasepartydetail'+'/param/'+key).toPromise();
  }
  }


  getlegalcasepartydetailsByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirelegalURL + '/legalcasepartydetail'+'/e/'+id).toPromise();
  }
  }
  getlegalcasepartydetailsByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirelegalURL + '/legalcasepartydetail'+'/'+id).toPromise();
  }
  }

  deletelegalcasepartydetail(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntirelegalURL + '/legalcasepartydetail'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntirelegalURL + '/legalcasepartydetail')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

