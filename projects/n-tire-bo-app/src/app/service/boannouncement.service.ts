import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { boannouncement } from '../model/boannouncement.model';
import { environment } from '../../environments/environment';
import { IboannouncementResponse } from '../model/boannouncement.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../shared/helper'
import { SessionService } from '../pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class boannouncementService {
  formData: boannouncement;
  readonly rootURL = AppConstants.baseURL;
  list: boannouncement[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdateboannouncements():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntireboURL + '/boannouncement', body);
  }
  }

  saveOrUpdateboannouncementsList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntireboURL + '/boannouncement', body);
  }
  }

  getboannouncementsList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/boannouncement').toPromise();
  }
  }
  getListByannouncementid(announcementid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/boannouncement'+'/announcementid/'+announcementid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/boannouncement'+'/param/'+key).toPromise();
  }
  }


  getboannouncementsByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/boannouncement'+'/e/'+id).toPromise();
  }
  }
  getboannouncementsByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/boannouncement'+'/'+id).toPromise();
  }
  }

  deleteboannouncement(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntireboURL + '/boannouncement'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntireboURL + '/boannouncement')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

