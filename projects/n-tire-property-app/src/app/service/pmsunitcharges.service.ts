import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { pmsunitcharges } from '../model/pmsunitcharges.model';
import { environment } from '../../environments/environment';
import { IpmsunitchargesResponse } from '../model/pmsunitcharges.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class pmsunitchargesService {
  formData: pmsunitcharges;
  readonly rootURL = AppConstants.baseURL;
  list: pmsunitcharges[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatepmsunitcharges():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntirepropertyURL + '/pmsunitcharges', body);
  }
  }

  saveOrUpdatepmsunitchargesList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntirepropertyURL + '/pmsunitcharges', body);
  }
  }

  getpmsunitchargesList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirepropertyURL + '/pmsunitcharges').toPromise();
  }
  }
  getListBychargeid(chargeid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirepropertyURL + '/pmsunitcharges'+'/chargeid/'+chargeid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirepropertyURL + '/pmsunitcharges'+'/param/'+key).toPromise();
  }
  }


  getpmsunitchargesByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirepropertyURL + '/pmsunitcharges'+'/e/'+id).toPromise();
  }
  }
  getpmsunitchargesByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirepropertyURL + '/pmsunitcharges'+'/'+id).toPromise();
  }
  }

  deletepmsunitcharges(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntirepropertyURL + '/pmsunitcharges'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntirepropertyURL + '/pmsunitcharges')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

