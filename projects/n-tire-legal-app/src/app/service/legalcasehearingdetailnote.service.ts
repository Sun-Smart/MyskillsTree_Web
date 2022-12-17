import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { legalcasehearingdetailnote } from '../model/legalcasehearingdetailnote.model';
import { environment } from '../../environments/environment';
import { IlegalcasehearingdetailnoteResponse } from '../model/legalcasehearingdetailnote.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class legalcasehearingdetailnoteService {
  formData: legalcasehearingdetailnote;
  readonly rootURL = AppConstants.baseURL;
  list: legalcasehearingdetailnote[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatelegalcasehearingdetailnotes():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntirelegalURL + '/legalcasehearingdetailnote', body);
  }
  }

  saveOrUpdatelegalcasehearingdetailnotesList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntirelegalURL + '/legalcasehearingdetailnote', body);
  }
  }

  getlegalcasehearingdetailnotesList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirelegalURL + '/legalcasehearingdetailnote').toPromise();
  }
  }
  getListByhearingnoteid(hearingnoteid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirelegalURL + '/legalcasehearingdetailnote'+'/hearingnoteid/'+hearingnoteid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirelegalURL + '/legalcasehearingdetailnote'+'/param/'+key).toPromise();
  }
  }


  getlegalcasehearingdetailnotesByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirelegalURL + '/legalcasehearingdetailnote'+'/e/'+id).toPromise();
  }
  }
  getlegalcasehearingdetailnotesByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirelegalURL + '/legalcasehearingdetailnote'+'/'+id).toPromise();
  }
  }

  deletelegalcasehearingdetailnote(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntirelegalURL + '/legalcasehearingdetailnote'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntirelegalURL + '/legalcasehearingdetailnote')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

