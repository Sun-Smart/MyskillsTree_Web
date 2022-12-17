import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { legalcasereferredcase } from '../model/legalcasereferredcase.model';
import { environment } from '../../environments/environment';
import { IlegalcasereferredcaseResponse } from '../model/legalcasereferredcase.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class legalcasereferredcaseService {
  formData: legalcasereferredcase;
  readonly rootURL = AppConstants.baseURL;
  list: legalcasereferredcase[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatelegalcasereferredcases():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntirelegalURL + '/legalcasereferredcase', body);
  }
  }

  saveOrUpdatelegalcasereferredcasesList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntirelegalURL + '/legalcasereferredcase', body);
  }
  }

  getlegalcasereferredcasesList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirelegalURL + '/legalcasereferredcase').toPromise();
  }
  }
  getListBylinkedid(linkedid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirelegalURL + '/legalcasereferredcase'+'/linkedid/'+linkedid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirelegalURL + '/legalcasereferredcase'+'/param/'+key).toPromise();
  }
  }


  getlegalcasereferredcasesByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirelegalURL + '/legalcasereferredcase'+'/e/'+id).toPromise();
  }
  }
  getlegalcasereferredcasesByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirelegalURL + '/legalcasereferredcase'+'/'+id).toPromise();
  }
  }

  deletelegalcasereferredcase(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntirelegalURL + '/legalcasereferredcase'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntirelegalURL + '/legalcasereferredcase')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

