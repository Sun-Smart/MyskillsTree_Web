import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { itassetnetworkdetail } from '../model/itassetnetworkdetail.model';
import { environment } from '../../environments/environment';
import { IitassetnetworkdetailResponse } from '../model/itassetnetworkdetail.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class itassetnetworkdetailService {
  formData: itassetnetworkdetail;
  readonly rootURL = AppConstants.ntireitURL;
  list: itassetnetworkdetail[];

  constructor(private http: HttpClient,public sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdateitassetnetworkdetails():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntireitURL + '/itassetnetworkdetail', body);
  }
  }

  saveOrUpdateitassetnetworkdetailsList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntireitURL + '/itassetnetworkdetail', body);
  }
  }

  getitassetnetworkdetailsList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireitURL + '/itassetnetworkdetail').toPromise();
  }
  }
  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireitURL + '/itassetnetworkdetail'+'/param/'+key).toPromise();
  }
  }


  getitassetnetworkdetailsByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireitURL + '/itassetnetworkdetail'+'/e/'+id).toPromise();
  }
  }
  getitassetnetworkdetailsByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireitURL + '/itassetnetworkdetail'+'/'+id).toPromise();
  }
  }

  deleteitassetnetworkdetail(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntireitURL + '/itassetnetworkdetail'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntireitURL + '/itassetnetworkdetail')
.toPromise()
.then((res:any) => this.list = res as any[]);
}
}


}

