import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { boterm } from '../model/boterm.model';
import { environment } from '../../environments/environment';
import { IbotermResponse } from '../model/boterm.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../shared/helper'
import { SessionService } from '../pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class botermService {
  formData: boterm;
  readonly rootURL = AppConstants.baseURL;
  list: boterm[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdateboterms():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntireboURL + '/boterm', body);
  }
  }

  saveOrUpdatebotermsList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntireboURL + '/boterm', body);
  }
  }

  getbotermsList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/boterm').toPromise();
  }
  }
  getListBytermid(termid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/boterm'+'/termid/'+termid).toPromise();
  }
  }

  getListBysourcereference(sourcereference:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/boterm'+'/sourcereference/'+sourcereference).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/boterm'+'/param/'+key).toPromise();
  }
  }


  getbotermsByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/boterm'+'/e/'+id).toPromise();
  }
  }
  getbotermsByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/boterm'+'/'+id).toPromise();
  }
  }

  deleteboterm(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntireboURL + '/boterm'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntireboURL + '/boterm')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

