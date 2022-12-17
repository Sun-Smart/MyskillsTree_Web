import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { legalcaselawyer } from '../model/legalcaselawyer.model';
import { environment } from '../../environments/environment';
import { IlegalcaselawyerResponse } from '../model/legalcaselawyer.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class legalcaselawyerService {
  formData: legalcaselawyer;
  readonly rootURL = AppConstants.baseURL;
  list: legalcaselawyer[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatelegalcaselawyers():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntirelegalURL + '/legalcaselawyer', body);
  }
  }

  saveOrUpdatelegalcaselawyersList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntirelegalURL + '/legalcaselawyer', body);
  }
  }

  getlegalcaselawyersList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirelegalURL + '/legalcaselawyer').toPromise();
  }
  }
  getListBycaselawyerid(caselawyerid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirelegalURL + '/legalcaselawyer'+'/caselawyerid/'+caselawyerid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirelegalURL + '/legalcaselawyer'+'/param/'+key).toPromise();
  }
  }


  getlegalcaselawyersByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirelegalURL + '/legalcaselawyer'+'/e/'+id).toPromise();
  }
  }
  getlegalcaselawyersByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirelegalURL + '/legalcaselawyer'+'/'+id).toPromise();
  }
  }

  deletelegalcaselawyer(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntirelegalURL + '/legalcaselawyer'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntirelegalURL + '/legalcaselawyer')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

