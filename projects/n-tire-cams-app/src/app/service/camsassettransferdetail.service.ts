import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { camsassettransferdetail } from '../model/camsassettransferdetail.model';
import { environment } from '../../environments/environment';
import { IcamsassettransferdetailResponse } from '../model/camsassettransferdetail.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class camsassettransferdetailService {
  formData: camsassettransferdetail;
  readonly rootURL = AppConstants.baseURL;
  list: camsassettransferdetail[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatecamsassettransferdetails():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntirecamsURL + '/camsassettransferdetail', body);
  }
  }

  saveOrUpdatecamsassettransferdetailsList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntirecamsURL + '/camsassettransferdetail', body);
  }
  }

  getcamsassettransferdetailsList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecamsURL + '/camsassettransferdetail').toPromise();
  }
  }
  getListBytransferdetailid(transferdetailid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecamsURL + '/camsassettransferdetail'+'/transferdetailid/'+transferdetailid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecamsURL + '/camsassettransferdetail'+'/param/'+key).toPromise();
  }
  }


  getcamsassettransferdetailsByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecamsURL + '/camsassettransferdetail'+'/e/'+id).toPromise();
  }
  }
  getcamsassettransferdetailsByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecamsURL + '/camsassettransferdetail'+'/'+id).toPromise();
  }
  }

  deletecamsassettransferdetail(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntirecamsURL + '/camsassettransferdetail'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntirecamsURL + '/camsassettransferdetail')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

