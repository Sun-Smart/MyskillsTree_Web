import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lmsassign } from '../model/lmsassign.model';
import { environment } from '../../environments/environment';
import { IlmsassignResponse } from '../model/lmsassign.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class lmsassignService {
  formData: lmsassign;
  readonly rootURL = AppConstants.baseURL;
  list: lmsassign[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatelmsassigns():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntirecrmURL + '/lmsassign', body);
  }
  }

  saveOrUpdatelmsassignsList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntirecrmURL + '/lmsassign', body);
  }
  }

  getlmsassignsList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecrmURL + '/lmsassign').toPromise();
  }
  }
  getListByassignid(assignid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecrmURL + '/lmsassign'+'/assignid/'+assignid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecrmURL + '/lmsassign'+'/param/'+key).toPromise();
  }
  }


  getlmsassignsByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecrmURL + '/lmsassign'+'/e/'+id).toPromise();
  }
  }
  getlmsassignsByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecrmURL + '/lmsassign'+'/'+id).toPromise();
  }
  }

  deletelmsassign(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntirecrmURL + '/lmsassign'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntirecrmURL + '/lmsassign')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

