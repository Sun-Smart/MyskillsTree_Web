import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lmscampaignnoaccess } from '../model/lmscampaignnoaccess.model';
import { environment } from '../../environments/environment';
import { IlmscampaignnoaccessResponse } from '../model/lmscampaignnoaccess.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class lmscampaignnoaccessService {
  formData: lmscampaignnoaccess;
  readonly rootURL = AppConstants.baseURL;
  list: lmscampaignnoaccess[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatelmscampaignnoaccesses():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntirecrmURL + '/lmscampaignnoaccess', body);
  }
  }

  saveOrUpdatelmscampaignnoaccessesList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntirecrmURL + '/lmscampaignnoaccess', body);
  }
  }

  getlmscampaignnoaccessesList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecrmURL + '/lmscampaignnoaccess').toPromise();
  }
  }
  getListByaccessid(accessid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecrmURL + '/lmscampaignnoaccess'+'/accessid/'+accessid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecrmURL + '/lmscampaignnoaccess'+'/param/'+key).toPromise();
  }
  }


  getlmscampaignnoaccessesByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecrmURL + '/lmscampaignnoaccess'+'/e/'+id).toPromise();
  }
  }
  getlmscampaignnoaccessesByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecrmURL + '/lmscampaignnoaccess'+'/'+id).toPromise();
  }
  }

  deletelmscampaignnoaccess(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntirecrmURL + '/lmscampaignnoaccess'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntirecrmURL + '/lmscampaignnoaccess')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

