import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lmsmaster } from '../model/lmsmaster.model';
import { lmsopportunity } from '../model/lmsopportunity.model';
import { lmscall } from '../model/lmscall.model';
import { lmscorporatesecondarycontact } from '../model/lmscorporatesecondarycontact.model';
import { environment } from '../../environments/environment';
import { IlmsmasterResponse } from '../model/lmsmaster.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class lmsmasterService {
  formData: lmsmaster;
  readonly rootURL = AppConstants.baseURL;
  list: lmsmaster[];
  lmsopportunities: lmsopportunity[]=[];
  lmscalls: lmscall[]=[];
  lmscorporatesecondarycontacts: lmscorporatesecondarycontact[]=[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatelmsmasters():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
      lmsopportunities: this.lmsopportunities.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
      lmscalls: this.lmscalls.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
      lmscorporatesecondarycontacts: this.lmscorporatesecondarycontacts.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
    };
    return this.http.post(AppConstants.ntirecrmURL + '/lmsmaster', body);
  }
  }

  saveOrUpdatelmsmastersList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntirecrmURL + '/lmsmaster', body);
  }
  }

  getlmsmastersList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecrmURL + '/lmsmaster').toPromise();
  }
  }
  getListByleadid(leadid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecrmURL + '/lmsmaster'+'/leadid/'+leadid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecrmURL + '/lmsmaster'+'/param/'+key).toPromise();
  }
  }


  getlmsmastersByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecrmURL + '/lmsmaster'+'/e/'+id).toPromise();
  }
  }
  getlmsmastersByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecrmURL + '/lmsmaster'+'/'+id).toPromise();
  }
  }

  deletelmsmaster(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntirecrmURL + '/lmsmaster'+'/'+id).toPromise();
  }
  }
clearList(){
this.lmsopportunities = [];
this.lmscalls = [];
this.lmscorporatesecondarycontacts = [];
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntirecrmURL + '/lmsmaster')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

