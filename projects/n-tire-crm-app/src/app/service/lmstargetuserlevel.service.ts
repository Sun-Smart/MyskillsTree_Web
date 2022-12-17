import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lmstargetuserlevel } from '../model/lmstargetuserlevel.model';
import { environment } from '../../environments/environment';
import { IlmstargetuserlevelResponse } from '../model/lmstargetuserlevel.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class lmstargetuserlevelService {
  formData: lmstargetuserlevel;
  readonly rootURL = AppConstants.baseURL;
  list: lmstargetuserlevel[];
DeletedlmstargetuserlevelIDs:string="";

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatelmstargetuserlevels():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntirecrmURL + '/lmstargetuserlevel', body);
  }
  }

  saveOrUpdatelmstargetuserlevelsList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
DeletedlmstargetuserlevelIDs:this.DeletedlmstargetuserlevelIDs,    };
    return this.http.post(AppConstants.ntirecrmURL + '/lmstargetuserlevel', body);
  }
  }

  getlmstargetuserlevelsList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecrmURL + '/lmstargetuserlevel').toPromise();
  }
  }
  getListBytargetid(targetid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecrmURL + '/lmstargetuserlevel'+'/targetid/'+targetid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecrmURL + '/lmstargetuserlevel'+'/param/'+key).toPromise();
  }
  }


  getlmstargetuserlevelsByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecrmURL + '/lmstargetuserlevel'+'/e/'+id).toPromise();
  }
  }
  getlmstargetuserlevelsByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecrmURL + '/lmstargetuserlevel'+'/'+id).toPromise();
  }
  }

  deletelmstargetuserlevel(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntirecrmURL + '/lmstargetuserlevel'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntirecrmURL + '/lmstargetuserlevel')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

