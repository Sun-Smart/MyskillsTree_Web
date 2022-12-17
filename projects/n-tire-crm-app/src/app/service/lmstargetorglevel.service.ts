import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lmstargetorglevel } from '../model/lmstargetorglevel.model';
import { environment } from '../../environments/environment';
import { IlmstargetorglevelResponse } from '../model/lmstargetorglevel.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class lmstargetorglevelService {
  formData: lmstargetorglevel;
  readonly rootURL = AppConstants.baseURL;
  list: lmstargetorglevel[];
DeletedlmstargetorglevelIDs:string="";

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatelmstargetorglevels():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntirecrmURL + '/lmstargetorglevel', body);
  }
  }

  saveOrUpdatelmstargetorglevelsList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
DeletedlmstargetorglevelIDs:this.DeletedlmstargetorglevelIDs,    };
    return this.http.post(AppConstants.ntirecrmURL + '/lmstargetorglevel', body);
  }
  }

  getlmstargetorglevelsList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecrmURL + '/lmstargetorglevel').toPromise();
  }
  }
  getListBytargetid(targetid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecrmURL + '/lmstargetorglevel'+'/targetid/'+targetid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecrmURL + '/lmstargetorglevel'+'/param/'+key).toPromise();
  }
  }


  getlmstargetorglevelsByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecrmURL + '/lmstargetorglevel'+'/e/'+id).toPromise();
  }
  }
  getlmstargetorglevelsByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecrmURL + '/lmstargetorglevel'+'/'+id).toPromise();
  }
  }

  deletelmstargetorglevel(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntirecrmURL + '/lmstargetorglevel'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntirecrmURL + '/lmstargetorglevel')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

