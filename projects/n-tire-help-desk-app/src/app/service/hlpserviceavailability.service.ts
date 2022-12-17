import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { hlpserviceavailability } from '../model/hlpserviceavailability.model';
import { environment } from '../../environments/environment';
import { IhlpserviceavailabilityResponse } from '../model/hlpserviceavailability.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class hlpserviceavailabilityService {
  formData: hlpserviceavailability;
  readonly rootURL = AppConstants.baseURL;
  list: hlpserviceavailability[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatehlpserviceavailabilities():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntirehelpdeskURL + '/hlpserviceavailability', body);
  }
  }

  saveOrUpdatehlpserviceavailabilitiesList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntirehelpdeskURL + '/hlpserviceavailability', body);
  }
  }

  gethlpserviceavailabilitiesList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehelpdeskURL + '/hlpserviceavailability').toPromise();
  }
  }
  getListByavailabilityid(availabilityid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehelpdeskURL + '/hlpserviceavailability'+'/availabilityid/'+availabilityid).toPromise();
  }
  }

  getListBysourcereference(sourcereference:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehelpdeskURL + '/hlpserviceavailability'+'/sourcereference/'+sourcereference).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehelpdeskURL + '/hlpserviceavailability'+'/param/'+key).toPromise();
  }
  }


  gethlpserviceavailabilitiesByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehelpdeskURL + '/hlpserviceavailability'+'/e/'+id).toPromise();
  }
  }
  gethlpserviceavailabilitiesByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehelpdeskURL + '/hlpserviceavailability'+'/'+id).toPromise();
  }
  }

  deletehlpserviceavailability(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntirehelpdeskURL + '/hlpserviceavailability'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntirehelpdeskURL + '/hlpserviceavailability')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

