import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { pmsdeposit } from '../model/pmsdeposit.model';
import { environment } from '../../environments/environment';
import { IpmsdepositResponse } from '../model/pmsdeposit.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class pmsdepositService {
  formData: pmsdeposit;
  readonly rootURL = AppConstants.baseURL;
  list: pmsdeposit[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatepmsdeposits():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntirepropertyURL + '/pmsdeposit', body);
  }
  }

  saveOrUpdatepmsdepositsList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntirepropertyURL + '/pmsdeposit', body);
  }
  }

  getpmsdepositsList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirepropertyURL + '/pmsdeposit').toPromise();
  }
  }
  getListBydepositid(depositid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirepropertyURL + '/pmsdeposit'+'/depositid/'+depositid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirepropertyURL + '/pmsdeposit'+'/param/'+key).toPromise();
  }
  }


  getpmsdepositsByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirepropertyURL + '/pmsdeposit'+'/e/'+id).toPromise();
  }
  }
  getpmsdepositsByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirepropertyURL + '/pmsdeposit'+'/'+id).toPromise();
  }
  }

  deletepmsdeposit(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntirepropertyURL + '/pmsdeposit'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntirepropertyURL + '/pmsdeposit')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

