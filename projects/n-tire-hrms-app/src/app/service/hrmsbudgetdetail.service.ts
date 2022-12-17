import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { hrmsbudgetdetail } from '../model/hrmsbudgetdetail.model';
import { environment } from '../../environments/environment';
import { IhrmsbudgetdetailResponse } from '../model/hrmsbudgetdetail.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class hrmsbudgetdetailService {
  formData: hrmsbudgetdetail;
  readonly rootURL = AppConstants.baseURL;
  list: hrmsbudgetdetail[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatehrmsbudgetdetails():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntirehrmsURL + '/hrmsbudgetdetail', body);
  }
  }

  saveOrUpdatehrmsbudgetdetailsList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntirehrmsURL + '/hrmsbudgetdetail', body);
  }
  }

  gethrmsbudgetdetailsList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsbudgetdetail').toPromise();
  }
  }
  getListBydetailid(detailid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsbudgetdetail'+'/detailid/'+detailid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsbudgetdetail'+'/param/'+key).toPromise();
  }
  }


  gethrmsbudgetdetailsByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsbudgetdetail'+'/e/'+id).toPromise();
  }
  }
  gethrmsbudgetdetailsByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsbudgetdetail'+'/'+id).toPromise();
  }
  }

  deletehrmsbudgetdetail(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntirehrmsURL + '/hrmsbudgetdetail'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntirehrmsURL + '/hrmsbudgetdetail')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

