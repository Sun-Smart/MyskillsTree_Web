import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { bonotifier } from '../model/bonotifier.model';
import { environment } from '../../environments/environment';
import { IbonotifierResponse } from '../model/bonotifier.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../shared/helper'
import { SessionService } from '../pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class bonotifierService {
  formData: bonotifier;
  readonly rootURL = AppConstants.baseURL;
  list: bonotifier[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatebonotifiers():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntireboURL + '/bonotifier', body);
  }
  }

  saveOrUpdatebonotifiersList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntireboURL + '/bonotifier', body);
  }
  }

  getbonotifiersList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/bonotifier').toPromise();
  }
  }
  getListBynotifierid(notifierid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/bonotifier'+'/notifierid/'+notifierid).toPromise();
  }
  }

  getListBysourcereference(sourcereference:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/bonotifier'+'/sourcereference/'+sourcereference).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/bonotifier'+'/param/'+key).toPromise();
  }
  }


  getbonotifiersByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/bonotifier'+'/e/'+id).toPromise();
  }
  }
  getbonotifiersByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/bonotifier'+'/'+id).toPromise();
  }
  }

  deletebonotifier(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntireboURL + '/bonotifier'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntireboURL + '/bonotifier')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

