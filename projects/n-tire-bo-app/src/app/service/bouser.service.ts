import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { bouser } from '../model/bouser.model';
import { environment } from '../../environments/environment';
import { IbouserResponse } from '../model/bouser.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../shared/helper'
import { SessionService } from '../pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class bouserService {
  formData: bouser;
  readonly rootURL = AppConstants.baseURL;
  list: bouser[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatebousers():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntireboURL + '/bouser', body);
  }
  }

  saveOrUpdatebousersList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntireboURL + '/bouser', body);
  }
  }

  getbousersList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/bouser').toPromise();
  }
  }
  getListBysourceuserid(sourceuserid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/bouser'+'/sourceuserid/'+sourceuserid).toPromise();
  }
  }

  getListBysourcereference(sourcereference:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/bouser'+'/sourcereference/'+sourcereference).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/bouser'+'/param/'+key).toPromise();
  }
  }


  getbousersByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/bouser'+'/e/'+id).toPromise();
  }
  }
  getbousersByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/bouser'+'/'+id).toPromise();
  }
  }

  deletebouser(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntireboURL + '/bouser'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntireboURL + '/bouser')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

