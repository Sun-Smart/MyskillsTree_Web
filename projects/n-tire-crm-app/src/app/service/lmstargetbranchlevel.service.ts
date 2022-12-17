import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lmstargetbranchlevel } from '../model/lmstargetbranchlevel.model';
import { environment } from '../../environments/environment';
import { IlmstargetbranchlevelResponse } from '../model/lmstargetbranchlevel.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class lmstargetbranchlevelService {
  formData: lmstargetbranchlevel;
  readonly rootURL = AppConstants.baseURL;
  list: lmstargetbranchlevel[];
DeletedlmstargetbranchlevelIDs:string="";

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatelmstargetbranchlevels():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntirecrmURL + '/lmstargetbranchlevel', body);
  }
  }

  saveOrUpdatelmstargetbranchlevelsList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
DeletedlmstargetbranchlevelIDs:this.DeletedlmstargetbranchlevelIDs,    };
    return this.http.post(AppConstants.ntirecrmURL + '/lmstargetbranchlevel', body);
  }
  }

  getlmstargetbranchlevelsList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecrmURL + '/lmstargetbranchlevel').toPromise();
  }
  }
  getListBytargetid(targetid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecrmURL + '/lmstargetbranchlevel'+'/targetid/'+targetid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecrmURL + '/lmstargetbranchlevel'+'/param/'+key).toPromise();
  }
  }


  getlmstargetbranchlevelsByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecrmURL + '/lmstargetbranchlevel'+'/e/'+id).toPromise();
  }
  }
  getlmstargetbranchlevelsByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecrmURL + '/lmstargetbranchlevel'+'/'+id).toPromise();
  }
  }

  deletelmstargetbranchlevel(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntirecrmURL + '/lmstargetbranchlevel'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntirecrmURL + '/lmstargetbranchlevel')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

