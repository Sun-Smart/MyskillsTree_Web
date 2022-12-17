import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lmsresponse } from '../model/lmsresponse.model';
import { lmssubresponse } from '../model/lmssubresponse.model';
import { environment } from '../../environments/environment';
import { IlmsresponseResponse } from '../model/lmsresponse.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class lmsresponseService {
  formData: lmsresponse;
  readonly rootURL = AppConstants.baseURL;
  list: lmsresponse[];
  lmssubresponses: lmssubresponse[]=[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatelmsresponses():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
      lmssubresponses: this.lmssubresponses.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
    };
    return this.http.post(AppConstants.ntirecrmURL + '/lmsresponse', body);
  }
  }

  saveOrUpdatelmsresponsesList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntirecrmURL + '/lmsresponse', body);
  }
  }

  getlmsresponsesList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecrmURL + '/lmsresponse').toPromise();
  }
  }
  getListByresponseid(responseid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecrmURL + '/lmsresponse'+'/responseid/'+responseid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecrmURL + '/lmsresponse'+'/param/'+key).toPromise();
  }
  }


  getlmsresponsesByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecrmURL + '/lmsresponse'+'/e/'+id).toPromise();
  }
  }
  getlmsresponsesByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecrmURL + '/lmsresponse'+'/'+id).toPromise();
  }
  }

  deletelmsresponse(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntirecrmURL + '/lmsresponse'+'/'+id).toPromise();
  }
  }
clearList(){
this.lmssubresponses = [];
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntirecrmURL + '/lmsresponse')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

