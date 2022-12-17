import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { hlpserviceavailabilit } from '../model/hlpserviceavailabilit.model';
import { environment } from '../../environments/environment';
import { IhlpserviceavailabilitResponse } from '../model/hlpserviceavailabilit.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class hlpserviceavailabilitService {
  formData: hlpserviceavailabilit;
  readonly rootURL = AppConstants.baseURL;
  list: hlpserviceavailabilit[];

  constructor(private http: HttpClient,public sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatehlpserviceavailabilities():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntirehelpdeskURL + '/hlpserviceavailabilit', body);
  }
  }

  saveOrUpdatehlpserviceavailabilitiesList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntirehelpdeskURL + '/hlpserviceavailabilit', body);
  }
  }

  gethlpserviceavailabilitiesList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehelpdeskURL + '/hlpserviceavailabilit').toPromise();
  }
  }
  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehelpdeskURL + '/hlpserviceavailabilit'+'/param/'+key).toPromise();
  }
  }


  gethlpserviceavailabilitiesByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehelpdeskURL + '/hlpserviceavailabilit'+'/e/'+id).toPromise();
  }
  }
  gethlpserviceavailabilitiesByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehelpdeskURL + '/hlpserviceavailabilit'+'/'+id).toPromise();
  }
  }

  deletehlpserviceavailabilit(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntirehelpdeskURL + '/hlpserviceavailabilit'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntirehelpdeskURL + '/hlpserviceavailabilit')
.toPromise()
.then((res:any) => this.list = res as any[]);
}
}


}

