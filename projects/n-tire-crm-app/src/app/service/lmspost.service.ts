import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lmspost } from '../model/lmspost.model';
import { environment } from '../../environments/environment';
import { IlmspostResponse } from '../model/lmspost.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class lmspostService {
  formData: lmspost;
  readonly rootURL = AppConstants.baseURL;
  list: lmspost[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatelmsposts():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntirecrmURL + '/lmspost', body);
  }
  }

  saveOrUpdatelmspostsList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntirecrmURL + '/lmspost', body);
  }
  }

  getlmspostsList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecrmURL + '/lmspost').toPromise();
  }
  }
  getListBypostid(postid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecrmURL + '/lmspost'+'/postid/'+postid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecrmURL + '/lmspost'+'/param/'+key).toPromise();
  }
  }


  getlmspostsByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecrmURL + '/lmspost'+'/e/'+id).toPromise();
  }
  }
  getlmspostsByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecrmURL + '/lmspost'+'/'+id).toPromise();
  }
  }

  deletelmspost(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntirecrmURL + '/lmspost'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntirecrmURL + '/lmspost')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

