import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { boauditevents } from '../model/boauditevents.model';
import { environment } from '../../environments/environment';
import { IboauditeventsResponse } from '../model/boauditevents.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../shared/helper'
import { SessionService } from '../pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class boauditeventsService {
  formData: boauditevents;
  readonly rootURL = AppConstants.baseURL;
  list: boauditevents[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdateboauditevents():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntireboURL + '/boauditevents', body);
  }
  }

  saveOrUpdateboauditeventsList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntireboURL + '/boauditevents', body);
  }
  }

  getboauditeventsList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/boauditevents').toPromise();
  }
  }
  getListByauditeventid(auditeventid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/boauditevents'+'/auditeventid/'+auditeventid).toPromise();
  }
  }

  getListBysourcereference(sourcereference:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/boauditevents'+'/sourcereference/'+sourcereference).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/boauditevents'+'/param/'+key).toPromise();
  }
  }


  getboauditeventsByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/boauditevents'+'/e/'+id).toPromise();
  }
  }
  getboauditeventsByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/boauditevents'+'/'+id).toPromise();
  }
  }

  deleteboauditevents(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntireboURL + '/boauditevents'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntireboURL + '/boauditevents')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

