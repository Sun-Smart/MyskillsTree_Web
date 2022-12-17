import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { hrmsemployeeattendedevent } from '../model/hrmsemployeeattendedevent.model';
import { environment } from '../../environments/environment';
import { IhrmsemployeeattendedeventResponse } from '../model/hrmsemployeeattendedevent.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class hrmsemployeeattendedeventService {
  formData: hrmsemployeeattendedevent;
  readonly rootURL = AppConstants.baseURL;
  list: hrmsemployeeattendedevent[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatehrmsemployeeattendedevents():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntirehrmsURL + '/hrmsemployeeattendedevent', body);
  }
  }

  saveOrUpdatehrmsemployeeattendedeventsList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntirehrmsURL + '/hrmsemployeeattendedevent', body);
  }
  }

  gethrmsemployeeattendedeventsList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeeattendedevent').toPromise();
  }
  }
  getListByeventid(eventid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeeattendedevent'+'/eventid/'+eventid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeeattendedevent'+'/param/'+key).toPromise();
  }
  }


  gethrmsemployeeattendedeventsByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeeattendedevent'+'/e/'+id).toPromise();
  }
  }
  gethrmsemployeeattendedeventsByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeeattendedevent'+'/'+id).toPromise();
  }
  }

  deletehrmsemployeeattendedevent(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntirehrmsURL + '/hrmsemployeeattendedevent'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeeattendedevent')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

