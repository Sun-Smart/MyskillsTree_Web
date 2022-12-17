import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { hrmsemployeeloandetail } from '../model/hrmsemployeeloandetail.model';
import { environment } from '../../environments/environment';
import { IhrmsemployeeloandetailResponse } from '../model/hrmsemployeeloandetail.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class hrmsemployeeloandetailService {
  formData: hrmsemployeeloandetail;
  readonly rootURL = AppConstants.baseURL;
  list: hrmsemployeeloandetail[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatehrmsemployeeloandetails():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntirehrmsURL + '/hrmsemployeeloandetail', body);
  }
  }

  saveOrUpdatehrmsemployeeloandetailsList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntirehrmsURL + '/hrmsemployeeloandetail', body);
  }
  }

  gethrmsemployeeloandetailsList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeeloandetail').toPromise();
  }
  }
  getListBydetailid(detailid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeeloandetail'+'/detailid/'+detailid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeeloandetail'+'/param/'+key).toPromise();
  }
  }


  gethrmsemployeeloandetailsByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeeloandetail'+'/e/'+id).toPromise();
  }
  }
  gethrmsemployeeloandetailsByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeeloandetail'+'/'+id).toPromise();
  }
  }

  deletehrmsemployeeloandetail(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntirehrmsURL + '/hrmsemployeeloandetail'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeeloandetail')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

