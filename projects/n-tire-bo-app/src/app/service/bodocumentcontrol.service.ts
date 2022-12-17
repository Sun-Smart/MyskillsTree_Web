import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { bodocumentcontrol } from '../model/bodocumentcontrol.model';
import { environment } from '../../environments/environment';
import { IbodocumentcontrolResponse } from '../model/bodocumentcontrol.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../shared/helper'
import { SessionService } from '../pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class bodocumentcontrolService {
  formData: bodocumentcontrol;
  readonly rootURL = AppConstants.baseURL;
  list: bodocumentcontrol[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatebodocumentcontrols():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntireboURL + '/bodocumentcontrol', body);
  }
  }

  saveOrUpdatebodocumentcontrolsList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntireboURL + '/bodocumentcontrol', body);
  }
  }

  getbodocumentcontrolsList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/bodocumentcontrol').toPromise();
  }
  }
  getListBycontrolid(controlid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/bodocumentcontrol'+'/controlid/'+controlid).toPromise();
  }
  }

  getListBysourcereference(sourcereference:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/bodocumentcontrol'+'/sourcereference/'+sourcereference).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/bodocumentcontrol'+'/param/'+key).toPromise();
  }
  }


  getbodocumentcontrolsByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/bodocumentcontrol'+'/e/'+id).toPromise();
  }
  }
  getbodocumentcontrolsByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/bodocumentcontrol'+'/'+id).toPromise();
  }
  }

  deletebodocumentcontrol(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntireboURL + '/bodocumentcontrol'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntireboURL + '/bodocumentcontrol')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

