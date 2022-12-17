import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lmssubresponse } from '../model/lmssubresponse.model';
import { environment } from '../../environments/environment';
import { IlmssubresponseResponse } from '../model/lmssubresponse.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class lmssubresponseService {
  formData: lmssubresponse;
  readonly rootURL = AppConstants.baseURL;
  list: lmssubresponse[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatelmssubresponses():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntirecrmURL + '/lmssubresponse', body);
  }
  }

  saveOrUpdatelmssubresponsesList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntirecrmURL + '/lmssubresponse', body);
  }
  }

  getlmssubresponsesList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecrmURL + '/lmssubresponse').toPromise();
  }
  }
  getListBysubresponseid(subresponseid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecrmURL + '/lmssubresponse'+'/subresponseid/'+subresponseid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecrmURL + '/lmssubresponse'+'/param/'+key).toPromise();
  }
  }


  getlmssubresponsesByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecrmURL + '/lmssubresponse'+'/e/'+id).toPromise();
  }
  }
  getlmssubresponsesByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecrmURL + '/lmssubresponse'+'/'+id).toPromise();
  }
  }

  deletelmssubresponse(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntirecrmURL + '/lmssubresponse'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntirecrmURL + '/lmssubresponse')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

