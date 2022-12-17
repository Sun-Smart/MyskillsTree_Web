import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { legalcaseinterimorder } from '../model/legalcaseinterimorder.model';
import { environment } from '../../environments/environment';
import { IlegalcaseinterimorderResponse } from '../model/legalcaseinterimorder.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class legalcaseinterimorderService {
  formData: legalcaseinterimorder;
  readonly rootURL = AppConstants.baseURL;
  list: legalcaseinterimorder[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatelegalcaseinterimorders():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntirelegalURL + '/legalcaseinterimorder', body);
  }
  }

  saveOrUpdatelegalcaseinterimordersList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntirelegalURL + '/legalcaseinterimorder', body);
  }
  }

  getlegalcaseinterimordersList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirelegalURL + '/legalcaseinterimorder').toPromise();
  }
  }
  getListByinterimorderid(interimorderid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirelegalURL + '/legalcaseinterimorder'+'/interimorderid/'+interimorderid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirelegalURL + '/legalcaseinterimorder'+'/param/'+key).toPromise();
  }
  }


  getlegalcaseinterimordersByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirelegalURL + '/legalcaseinterimorder'+'/e/'+id).toPromise();
  }
  }
  getlegalcaseinterimordersByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirelegalURL + '/legalcaseinterimorder'+'/'+id).toPromise();
  }
  }

  deletelegalcaseinterimorder(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntirelegalURL + '/legalcaseinterimorder'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntirelegalURL + '/legalcaseinterimorder')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

