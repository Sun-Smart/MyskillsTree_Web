import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { hrmsadvertisementdetail } from '../model/hrmsadvertisementdetail.model';
import { environment } from '../../environments/environment';
import { IhrmsadvertisementdetailResponse } from '../model/hrmsadvertisementdetail.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class hrmsadvertisementdetailService {
  formData: hrmsadvertisementdetail;
  readonly rootURL = AppConstants.baseURL;
  list: hrmsadvertisementdetail[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatehrmsadvertisementdetails():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntirehrmsURL + '/hrmsadvertisementdetail', body);
  }
  }

  saveOrUpdatehrmsadvertisementdetailsList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntirehrmsURL + '/hrmsadvertisementdetail', body);
  }
  }

  gethrmsadvertisementdetailsList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsadvertisementdetail').toPromise();
  }
  }
  getListBydetailid(detailid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsadvertisementdetail'+'/detailid/'+detailid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsadvertisementdetail'+'/param/'+key).toPromise();
  }
  }


  gethrmsadvertisementdetailsByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsadvertisementdetail'+'/e/'+id).toPromise();
  }
  }
  gethrmsadvertisementdetailsByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsadvertisementdetail'+'/'+id).toPromise();
  }
  }

  deletehrmsadvertisementdetail(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntirehrmsURL + '/hrmsadvertisementdetail'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntirehrmsURL + '/hrmsadvertisementdetail')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

