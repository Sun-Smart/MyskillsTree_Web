import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ecmspecial } from '../model/ecmspecial.model';
import { environment } from '../../environments/environment';
import { IecmspecialResponse } from '../model/ecmspecial.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class ecmspecialService {
  formData: ecmspecial;
  readonly rootURL = AppConstants.baseURL;
  list: ecmspecial[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdateecmspecials():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntirecommerceURL + '/ecmspecial', body);
  }
  }

  saveOrUpdateecmspecialsList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntirecommerceURL + '/ecmspecial', body);
  }
  }

  getecmspecialsList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecommerceURL + '/ecmspecial').toPromise();
  }
  }
  getListByspecialid(specialid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecommerceURL + '/ecmspecial'+'/specialid/'+specialid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecommerceURL + '/ecmspecial'+'/param/'+key).toPromise();
  }
  }


  getecmspecialsByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecommerceURL + '/ecmspecial'+'/e/'+id).toPromise();
  }
  }
  getecmspecialsByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecommerceURL + '/ecmspecial'+'/'+id).toPromise();
  }
  }

  deleteecmspecial(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntirecommerceURL + '/ecmspecial'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntirecommerceURL + '/ecmspecial')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

