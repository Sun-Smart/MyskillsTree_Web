import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { hrmstamssetting } from '../model/hrmstamssetting.model';
import { environment } from '../../environments/environment';
import { IhrmstamssettingResponse } from '../model/hrmstamssetting.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class hrmstamssettingService {
  formData: hrmstamssetting;
  readonly rootURL = AppConstants.baseURL;
  list: hrmstamssetting[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatehrmstamssettings():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntirehrmsURL + '/hrmstamssetting', body);
  }
  }

  saveOrUpdatehrmstamssettingsList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntirehrmsURL + '/hrmstamssetting', body);
  }
  }

  gethrmstamssettingsList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmstamssetting').toPromise();
  }
  }
  getListBytamsid(tamsid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmstamssetting'+'/tamsid/'+tamsid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmstamssetting'+'/param/'+key).toPromise();
  }
  }


  gethrmstamssettingsByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmstamssetting'+'/e/'+id).toPromise();
  }
  }
  gethrmstamssettingsByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmstamssetting'+'/'+id).toPromise();
  }
  }

  deletehrmstamssetting(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntirehrmsURL + '/hrmstamssetting'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntirehrmsURL + '/hrmstamssetting')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

