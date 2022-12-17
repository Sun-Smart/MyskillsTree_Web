import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { borisk } from '../model/borisk.model';
import { environment } from '../../environments/environment';
import { IboriskResponse } from '../model/borisk.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../shared/helper'
import { SessionService } from '../pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class boriskService {
  formData: borisk;
  readonly rootURL = AppConstants.baseURL;
  list: borisk[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdateborisks():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntireboURL + '/borisk', body);
  }
  }

  saveOrUpdateborisksList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntireboURL + '/borisk', body);
  }
  }

  getborisksList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/borisk').toPromise();
  }
  }
  getListByriskid(riskid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/borisk'+'/riskid/'+riskid).toPromise();
  }
  }

  getListBysourcereference(sourcereference:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/borisk'+'/sourcereference/'+sourcereference).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/borisk'+'/param/'+key).toPromise();
  }
  }


  getborisksByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/borisk'+'/e/'+id).toPromise();
  }
  }
  getborisksByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/borisk'+'/'+id).toPromise();
  }
  }

  deleteborisk(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntireboURL + '/borisk'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntireboURL + '/borisk')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

