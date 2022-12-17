import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { legalcaserespondentdetail } from '../model/legalcaserespondentdetail.model';
import { environment } from '../../environments/environment';
import { IlegalcaserespondentdetailResponse } from '../model/legalcaserespondentdetail.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class legalcaserespondentdetailService {
  formData: legalcaserespondentdetail;
  readonly rootURL = AppConstants.baseURL;
  list: legalcaserespondentdetail[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatelegalcaserespondentdetails():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntirelegalURL + '/legalcaserespondentdetail', body);
  }
  }

  saveOrUpdatelegalcaserespondentdetailsList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntirelegalURL + '/legalcaserespondentdetail', body);
  }
  }

  getlegalcaserespondentdetailsList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirelegalURL + '/legalcaserespondentdetail').toPromise();
  }
  }
  getListByrespondentid(respondentid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirelegalURL + '/legalcaserespondentdetail'+'/respondentid/'+respondentid).toPromise();
  }
  }

  getListByrespondenttype(respondenttype:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirelegalURL + '/legalcaserespondentdetail'+'/respondenttype/'+respondenttype).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirelegalURL + '/legalcaserespondentdetail'+'/param/'+key).toPromise();
  }
  }


  getlegalcaserespondentdetailsByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirelegalURL + '/legalcaserespondentdetail'+'/e/'+id).toPromise();
  }
  }
  getlegalcaserespondentdetailsByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirelegalURL + '/legalcaserespondentdetail'+'/'+id).toPromise();
  }
  }

  deletelegalcaserespondentdetail(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntirelegalURL + '/legalcaserespondentdetail'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntirelegalURL + '/legalcaserespondentdetail')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

