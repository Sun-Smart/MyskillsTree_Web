import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { hlpservicelevel } from '../model/hlpservicelevel.model';
import { hlpslapriority } from '../model/hlpslapriority.model';
import { hlpslasupporthour } from '../model/hlpslasupporthour.model';
import { environment } from '../../environments/environment';
import { IhlpservicelevelResponse } from '../model/hlpservicelevel.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class hlpservicelevelService {
  formData: hlpservicelevel;
  readonly rootURL = AppConstants.baseURL;
  list: hlpservicelevel[];
  hlpslapriorities: hlpslapriority[]=[];
  hlpslasupporthours: hlpslasupporthour[]=[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatehlpservicelevels():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
      hlpslapriorities: this.hlpslapriorities.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
      hlpslasupporthours: this.hlpslasupporthours.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
    };
    return this.http.post(AppConstants.ntirehelpdeskURL + '/hlpservicelevel', body);
  }
  }

  saveOrUpdatehlpservicelevelsList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntirehelpdeskURL + '/hlpservicelevel', body);
  }
  }

  gethlpservicelevelsList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehelpdeskURL + '/hlpservicelevel').toPromise();
  }
  }
  getListByservicelevelid(servicelevelid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehelpdeskURL + '/hlpservicelevel'+'/servicelevelid/'+servicelevelid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehelpdeskURL + '/hlpservicelevel'+'/param/'+key).toPromise();
  }
  }


  gethlpservicelevelsByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehelpdeskURL + '/hlpservicelevel'+'/e/'+id).toPromise();
  }
  }
  gethlpservicelevelsByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehelpdeskURL + '/hlpservicelevel'+'/'+id).toPromise();
  }
  }

  deletehlpservicelevel(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntirehelpdeskURL + '/hlpservicelevel'+'/'+id).toPromise();
  }
  }
clearList(){
this.hlpslapriorities = [];
this.hlpslasupporthours = [];
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntirehelpdeskURL + '/hlpservicelevel')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

