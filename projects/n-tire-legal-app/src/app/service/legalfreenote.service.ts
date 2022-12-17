import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { legalfreenote } from '../model/legalfreenote.model';
import { environment } from '../../environments/environment';
import { IlegalfreenoteResponse } from '../model/legalfreenote.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class legalfreenoteService {
  formData: legalfreenote;
  readonly rootURL = AppConstants.baseURL;
  list: legalfreenote[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatelegalfreenotes():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntirelegalURL + '/legalfreenote', body);
  }
  }

  saveOrUpdatelegalfreenotesList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntirelegalURL + '/legalfreenote', body);
  }
  }

  getlegalfreenotesList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirelegalURL + '/legalfreenote').toPromise();
  }
  }
  getListByfreenotesid(freenotesid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirelegalURL + '/legalfreenote'+'/freenotesid/'+freenotesid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirelegalURL + '/legalfreenote'+'/param/'+key).toPromise();
  }
  }


  getlegalfreenotesByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirelegalURL + '/legalfreenote'+'/e/'+id).toPromise();
  }
  }
  getlegalfreenotesByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirelegalURL + '/legalfreenote'+'/'+id).toPromise();
  }
  }

  deletelegalfreenote(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntirelegalURL + '/legalfreenote'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntirelegalURL + '/legalfreenote')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

