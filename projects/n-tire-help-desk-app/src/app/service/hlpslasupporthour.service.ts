import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { hlpslasupporthour } from '../model/hlpslasupporthour.model';
import { environment } from '../../environments/environment';
import { IhlpslasupporthourResponse } from '../model/hlpslasupporthour.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class hlpslasupporthourService {
  formData: hlpslasupporthour;
  readonly rootURL = AppConstants.baseURL;
  list: hlpslasupporthour[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatehlpslasupporthours():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntirehelpdeskURL + '/hlpslasupporthour', body);
  }
  }

  saveOrUpdatehlpslasupporthoursList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntirehelpdeskURL + '/hlpslasupporthour', body);
  }
  }

  gethlpslasupporthoursList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehelpdeskURL + '/hlpslasupporthour').toPromise();
  }
  }
  getListBysupportid(supportid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehelpdeskURL + '/hlpslasupporthour'+'/supportid/'+supportid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehelpdeskURL + '/hlpslasupporthour'+'/param/'+key).toPromise();
  }
  }


  gethlpslasupporthoursByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehelpdeskURL + '/hlpslasupporthour'+'/e/'+id).toPromise();
  }
  }
  gethlpslasupporthoursByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehelpdeskURL + '/hlpslasupporthour'+'/'+id).toPromise();
  }
  }

  deletehlpslasupporthour(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntirehelpdeskURL + '/hlpslasupporthour'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntirehelpdeskURL + '/hlpslasupporthour')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

