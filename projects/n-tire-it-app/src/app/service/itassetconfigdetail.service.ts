import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { itassetconfigdetail } from '../model/itassetconfigdetail.model';
import { environment } from '../../environments/environment';
import { IitassetconfigdetailResponse } from '../model/itassetconfigdetail.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class itassetconfigdetailService {
  formData: itassetconfigdetail;
  readonly rootURL = AppConstants.ntireitURL;
  list: itassetconfigdetail[];

  constructor(private http: HttpClient,public sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdateitassetconfigdetails():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntireitURL + '/itassetconfigdetail', body);
  }
  }

  saveOrUpdateitassetconfigdetailsList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntireitURL + '/itassetconfigdetail', body);
  }
  }

  getitassetconfigdetailsList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireitURL + '/itassetconfigdetail').toPromise();
  }
  }
  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireitURL + '/itassetconfigdetail'+'/param/'+key).toPromise();
  }
  }


  getitassetconfigdetailsByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireitURL + '/itassetconfigdetail'+'/e/'+id).toPromise();
  }
  }
  getitassetconfigdetailsByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireitURL + '/itassetconfigdetail'+'/'+id).toPromise();
  }
  }

  deleteitassetconfigdetail(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntireitURL + '/itassetconfigdetail'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntireitURL + '/itassetconfigdetail')
.toPromise()
.then((res:any) => this.list = res as any[]);
}
}


}

