import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { itlicense } from '../model/itlicense.model';
import { environment } from '../../environments/environment';
import { IitlicenseResponse } from '../model/itlicense.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class itlicenseService {
  formData: itlicense;
  readonly rootURL = AppConstants.ntireitURL;
  list: itlicense[];

  constructor(private http: HttpClient,public sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdateitlicenses():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntireitURL + '/itlicense', body);
  }
  }

  saveOrUpdateitlicensesList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntireitURL + '/itlicense', body);
  }
  }

  getitlicensesList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireitURL + '/itlicense').toPromise();
  }
  }
  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireitURL + '/itlicense'+'/param/'+key).toPromise();
  }
  }


  getitlicensesByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireitURL + '/itlicense'+'/e/'+id).toPromise();
  }
  }
  getitlicensesByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireitURL + '/itlicense'+'/'+id).toPromise();
  }
  }

  deleteitlicense(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntireitURL + '/itlicense'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntireitURL + '/itlicense')
.toPromise()
.then((res:any) => this.list = res as any[]);
}
}


}

