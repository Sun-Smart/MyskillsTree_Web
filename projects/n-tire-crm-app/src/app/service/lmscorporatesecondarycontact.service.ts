import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lmscorporatesecondarycontact } from '../model/lmscorporatesecondarycontact.model';
import { environment } from '../../environments/environment';
import { IlmscorporatesecondarycontactResponse } from '../model/lmscorporatesecondarycontact.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class lmscorporatesecondarycontactService {
  formData: lmscorporatesecondarycontact;
  readonly rootURL = AppConstants.baseURL;
  list: lmscorporatesecondarycontact[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatelmscorporatesecondarycontacts():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntirecrmURL + '/lmscorporatesecondarycontact', body);
  }
  }

  saveOrUpdatelmscorporatesecondarycontactsList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntirecrmURL + '/lmscorporatesecondarycontact', body);
  }
  }

  getlmscorporatesecondarycontactsList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecrmURL + '/lmscorporatesecondarycontact').toPromise();
  }
  }
  getListBysecondarycontactid(secondarycontactid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecrmURL + '/lmscorporatesecondarycontact'+'/secondarycontactid/'+secondarycontactid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecrmURL + '/lmscorporatesecondarycontact'+'/param/'+key).toPromise();
  }
  }


  getlmscorporatesecondarycontactsByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecrmURL + '/lmscorporatesecondarycontact'+'/e/'+id).toPromise();
  }
  }
  getlmscorporatesecondarycontactsByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecrmURL + '/lmscorporatesecondarycontact'+'/'+id).toPromise();
  }
  }

  deletelmscorporatesecondarycontact(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntirecrmURL + '/lmscorporatesecondarycontact'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntirecrmURL + '/lmscorporatesecondarycontact')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

