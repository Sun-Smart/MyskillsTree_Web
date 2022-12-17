import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { bocompanysetting } from '../model/bocompanysetting.model';
import { environment } from '../../environments/environment';
import { IbocompanysettingResponse } from '../model/bocompanysetting.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../shared/helper'
import { SessionService } from '../pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class bocompanysettingService {
  formData: bocompanysetting;
  readonly rootURL = AppConstants.baseURL;
  list: bocompanysetting[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatebocompanysettings():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntireboURL + '/bocompanysetting', body);
  }
  }

  saveOrUpdatebocompanysettingsList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntireboURL + '/bocompanysetting', body);
  }
  }

  getbocompanysettingsList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/bocompanysetting').toPromise();
  }
  }
  getListBysettingsid(settingsid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/bocompanysetting'+'/settingsid/'+settingsid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/bocompanysetting'+'/param/'+key).toPromise();
  }
  }


  getbocompanysettingsByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/bocompanysetting'+'/e/'+id).toPromise();
  }
  }
  getbocompanysettingsByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/bocompanysetting'+'/'+id).toPromise();
  }
  }

  deletebocompanysetting(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntireboURL + '/bocompanysetting'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntireboURL + '/bocompanysetting')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

