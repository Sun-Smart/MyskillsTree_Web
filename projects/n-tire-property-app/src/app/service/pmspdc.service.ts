import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { pmspdc } from '../model/pmspdc.model';
import { environment } from '../../environments/environment';
import { IpmspdcResponse } from '../model/pmspdc.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class pmspdcService {
  formData: pmspdc;
  readonly rootURL = AppConstants.baseURL;
  list: pmspdc[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatepmspdcs():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntirepropertyURL + '/pmspdc', body);
  }
  }

  saveOrUpdatepmspdcsList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntirepropertyURL + '/pmspdc', body);
  }
  }

  getpmspdcsList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirepropertyURL + '/pmspdc').toPromise();
  }
  }
  getListBypdcid(pdcid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirepropertyURL + '/pmspdc'+'/pdcid/'+pdcid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirepropertyURL + '/pmspdc'+'/param/'+key).toPromise();
  }
  }


  getpmspdcsByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirepropertyURL + '/pmspdc'+'/e/'+id).toPromise();
  }
  }
  getpmspdcsByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirepropertyURL + '/pmspdc'+'/'+id).toPromise();
  }
  }

  deletepmspdc(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntirepropertyURL + '/pmspdc'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntirepropertyURL + '/pmspdc')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

