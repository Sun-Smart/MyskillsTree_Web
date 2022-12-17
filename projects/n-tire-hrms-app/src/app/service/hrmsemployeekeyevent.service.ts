import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { hrmsemployeekeyevent } from '../model/hrmsemployeekeyevent.model';
import { environment } from '../../environments/environment';
import { IhrmsemployeekeyeventResponse } from '../model/hrmsemployeekeyevent.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class hrmsemployeekeyeventService {
  formData: hrmsemployeekeyevent;
  readonly rootURL = AppConstants.baseURL;
  list: hrmsemployeekeyevent[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatehrmsemployeekeyevents():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntirehrmsURL + '/hrmsemployeekeyevent', body);
  }
  }

  saveOrUpdatehrmsemployeekeyeventsList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntirehrmsURL + '/hrmsemployeekeyevent', body);
  }
  }

  gethrmsemployeekeyeventsList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeekeyevent').toPromise();
  }
  }
  getListBykeyeventid(keyeventid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeekeyevent'+'/keyeventid/'+keyeventid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeekeyevent'+'/param/'+key).toPromise();
  }
  }


  gethrmsemployeekeyeventsByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeekeyevent'+'/e/'+id).toPromise();
  }
  }
  gethrmsemployeekeyeventsByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeekeyevent'+'/'+id).toPromise();
  }
  }

  deletehrmsemployeekeyevent(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntirehrmsURL + '/hrmsemployeekeyevent'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeekeyevent')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

