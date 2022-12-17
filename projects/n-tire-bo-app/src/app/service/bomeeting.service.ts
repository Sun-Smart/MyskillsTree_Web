import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { bomeeting } from '../model/bomeeting.model';
import { bomeetinginvite } from '../model/bomeetinginvite.model';
import { bomeetingreminder } from '../model/bomeetingreminder.model';
import { environment } from '../../environments/environment';
import { IbomeetingResponse } from '../model/bomeeting.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../shared/helper'
import { SessionService } from '../pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class bomeetingService {
  formData: bomeeting;
  readonly rootURL = AppConstants.baseURL;
  bomeetinginvitees: bomeetinginvite[]=[];
  bomeetingreminders: bomeetingreminder[]=[];
  list: bomeeting[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatebomeetings():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
      bomeetinginvitees: this.bomeetinginvitees.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
      bomeetingreminders: this.bomeetingreminders.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
    };
    return this.http.post(AppConstants.ntireboURL + '/bomeeting', body);
  }
  }

  saveOrUpdatebomeetingsList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntireboURL + '/bomeeting', body);
  }
  }

  getbomeetingsList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/bomeeting').toPromise();
  }
  }
  getListBymeetingid(meetingid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/bomeeting'+'/meetingid/'+meetingid).toPromise();
  }
  }

  getListBysourcereference(sourcereference:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/bomeeting'+'/sourcereference/'+sourcereference).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/bomeeting'+'/param/'+key).toPromise();
  }
  }


  getbomeetingsByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/bomeeting'+'/e/'+id).toPromise();
  }
  }
  getbomeetingsByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/bomeeting'+'/'+id).toPromise();
  }
  }

  deletebomeeting(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntireboURL + '/bomeeting'+'/'+id).toPromise();
  }
  }
clearList(){
this.bomeetinginvitees = [];
this.bomeetingreminders = [];
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntireboURL + '/bomeeting')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

