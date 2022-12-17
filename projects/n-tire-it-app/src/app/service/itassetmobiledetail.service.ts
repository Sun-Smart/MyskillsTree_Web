import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { itassetmobiledetail } from '../model/itassetmobiledetail.model';
import { environment } from '../../environments/environment';
import { IitassetmobiledetailResponse } from '../model/itassetmobiledetail.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class itassetmobiledetailService {
  formData: itassetmobiledetail;
  readonly rootURL = AppConstants.ntireitURL;
  list: itassetmobiledetail[];

  constructor(private http: HttpClient,public sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdateitassetmobiledetails():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntireitURL + '/itassetmobiledetail', body);
  }
  }

  saveOrUpdateitassetmobiledetailsList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntireitURL + '/itassetmobiledetail', body);
  }
  }

  getitassetmobiledetailsList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireitURL + '/itassetmobiledetail').toPromise();
  }
  }
  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireitURL + '/itassetmobiledetail'+'/param/'+key).toPromise();
  }
  }


  getitassetmobiledetailsByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireitURL + '/itassetmobiledetail'+'/e/'+id).toPromise();
  }
  }
  getitassetmobiledetailsByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireitURL + '/itassetmobiledetail'+'/'+id).toPromise();
  }
  }

  deleteitassetmobiledetail(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntireitURL + '/itassetmobiledetail'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntireitURL + '/itassetmobiledetail')
.toPromise()
.then((res:any) => this.list = res as any[]);
}
}


}

