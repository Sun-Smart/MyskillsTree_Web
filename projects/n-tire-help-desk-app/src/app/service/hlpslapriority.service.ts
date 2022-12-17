import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { hlpslapriority } from '../model/hlpslapriority.model';
import { environment } from '../../environments/environment';
import { IhlpslapriorityResponse } from '../model/hlpslapriority.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class hlpslapriorityService {
  formData: hlpslapriority;
  readonly rootURL = AppConstants.baseURL;
  list: hlpslapriority[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatehlpslapriorities():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntirehelpdeskURL + '/hlpslapriority', body);
  }
  }

  saveOrUpdatehlpslaprioritiesList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntirehelpdeskURL + '/hlpslapriority', body);
  }
  }

  gethlpslaprioritiesList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehelpdeskURL + '/hlpslapriority').toPromise();
  }
  }
  getListByservicelevelpriorityid(servicelevelpriorityid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehelpdeskURL + '/hlpslapriority'+'/servicelevelpriorityid/'+servicelevelpriorityid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehelpdeskURL + '/hlpslapriority'+'/param/'+key).toPromise();
  }
  }


  gethlpslaprioritiesByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehelpdeskURL + '/hlpslapriority'+'/e/'+id).toPromise();
  }
  }
  gethlpslaprioritiesByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehelpdeskURL + '/hlpslapriority'+'/'+id).toPromise();
  }
  }

  deletehlpslapriority(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntirehelpdeskURL + '/hlpslapriority'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntirehelpdeskURL + '/hlpslapriority')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

