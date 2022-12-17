import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { bonotificationsetting } from '../model/bonotificationsetting.model';
import { environment } from '../../environments/environment';
import { IbonotificationsettingResponse } from '../model/bonotificationsetting.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../shared/helper'
import { SessionService } from '../pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class bonotificationsettingService {
  formData: bonotificationsetting;
  readonly rootURL = AppConstants.baseURL;
  list: bonotificationsetting[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatebonotificationsettings():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntireboURL + '/bonotificationsetting', body);
  }
  }

  saveOrUpdatebonotificationsettingsList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntireboURL + '/bonotificationsetting', body);
  }
  }

  getbonotificationsettingsList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/bonotificationsetting').toPromise();
  }
  }
  getListBynotificationmasterid(notificationmasterid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/bonotificationsetting'+'/notificationmasterid/'+notificationmasterid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/bonotificationsetting'+'/param/'+key).toPromise();
  }
  }


  getbonotificationsettingsByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/bonotificationsetting'+'/e/'+id).toPromise();
  }
  }
  getbonotificationsettingsByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/bonotificationsetting'+'/'+id).toPromise();
  }
  }

  deletebonotificationsetting(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntireboURL + '/bonotificationsetting'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntireboURL + '/bonotificationsetting')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

