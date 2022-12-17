import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lmssecondarycontact } from '../model/lmssecondarycontact.model';
import { environment } from '../../environments/environment';
import { IlmssecondarycontactResponse } from '../model/lmssecondarycontact.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class lmssecondarycontactService {
  formData: lmssecondarycontact;
  readonly rootURL = AppConstants.baseURL;
  list: lmssecondarycontact[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatelmssecondarycontacts():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntirecrmURL + '/lmssecondarycontact', body);
  }
  }

  saveOrUpdatelmssecondarycontactsList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntirecrmURL + '/lmssecondarycontact', body);
  }
  }

  getlmssecondarycontactsList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecrmURL + '/lmssecondarycontact').toPromise();
  }
  }
  getListBysecondarycontactid(secondarycontactid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecrmURL + '/lmssecondarycontact'+'/secondarycontactid/'+secondarycontactid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecrmURL + '/lmssecondarycontact'+'/param/'+key).toPromise();
  }
  }


  getlmssecondarycontactsByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecrmURL + '/lmssecondarycontact'+'/e/'+id).toPromise();
  }
  }
  getlmssecondarycontactsByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecrmURL + '/lmssecondarycontact'+'/'+id).toPromise();
  }
  }

  deletelmssecondarycontact(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntirecrmURL + '/lmssecondarycontact'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntirecrmURL + '/lmssecondarycontact')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

