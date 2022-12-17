import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { hrmsemployeedeliveredevent } from '../model/hrmsemployeedeliveredevent.model';
import { environment } from '../../environments/environment';
import { IhrmsemployeedeliveredeventResponse } from '../model/hrmsemployeedeliveredevent.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class hrmsemployeedeliveredeventService {
  formData: hrmsemployeedeliveredevent;
  readonly rootURL = AppConstants.baseURL;
  list: hrmsemployeedeliveredevent[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatehrmsemployeedeliveredevents():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntirehrmsURL + '/hrmsemployeedeliveredevent', body);
  }
  }

  saveOrUpdatehrmsemployeedeliveredeventsList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntirehrmsURL + '/hrmsemployeedeliveredevent', body);
  }
  }

  gethrmsemployeedeliveredeventsList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeedeliveredevent').toPromise();
  }
  }
  getListByeventid(eventid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeedeliveredevent'+'/eventid/'+eventid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeedeliveredevent'+'/param/'+key).toPromise();
  }
  }


  gethrmsemployeedeliveredeventsByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeedeliveredevent'+'/e/'+id).toPromise();
  }
  }
  gethrmsemployeedeliveredeventsByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeedeliveredevent'+'/'+id).toPromise();
  }
  }

  deletehrmsemployeedeliveredevent(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntirehrmsURL + '/hrmsemployeedeliveredevent'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeedeliveredevent')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

