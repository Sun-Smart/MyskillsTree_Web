import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { legalcasekb } from '../model/legalcasekb.model';
import { environment } from '../../environments/environment';
import { IlegalcasekbResponse } from '../model/legalcasekb.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class legalcasekbService {
  formData: legalcasekb;
  readonly rootURL = AppConstants.baseURL;
  list: legalcasekb[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatelegalcasekbs():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntirelegalURL + '/legalcasekb', body);
  }
  }

  saveOrUpdatelegalcasekbsList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntirelegalURL + '/legalcasekb', body);
  }
  }

  getlegalcasekbsList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirelegalURL + '/legalcasekb').toPromise();
  }
  }
  getListBykbcaseid(kbcaseid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirelegalURL + '/legalcasekb'+'/kbcaseid/'+kbcaseid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirelegalURL + '/legalcasekb'+'/param/'+key).toPromise();
  }
  }


  getlegalcasekbsByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirelegalURL + '/legalcasekb'+'/e/'+id).toPromise();
  }
  }
  getlegalcasekbsByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirelegalURL + '/legalcasekb'+'/'+id).toPromise();
  }
  }

  deletelegalcasekb(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntirelegalURL + '/legalcasekb'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntirelegalURL + '/legalcasekb')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

