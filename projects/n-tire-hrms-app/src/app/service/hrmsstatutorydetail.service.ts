import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { hrmsstatutorydetail } from '../model/hrmsstatutorydetail.model';
import { environment } from '../../environments/environment';
import { IhrmsstatutorydetailResponse } from '../model/hrmsstatutorydetail.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class hrmsstatutorydetailService {
  formData: hrmsstatutorydetail;
  readonly rootURL = AppConstants.baseURL;
  list: hrmsstatutorydetail[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatehrmsstatutorydetails():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntirehrmsURL + '/hrmsstatutorydetail', body);
  }
  }

  saveOrUpdatehrmsstatutorydetailsList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntirehrmsURL + '/hrmsstatutorydetail', body);
  }
  }

  gethrmsstatutorydetailsList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsstatutorydetail').toPromise();
  }
  }
  getListBydetailid(detailid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsstatutorydetail'+'/detailid/'+detailid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsstatutorydetail'+'/param/'+key).toPromise();
  }
  }


  gethrmsstatutorydetailsByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsstatutorydetail'+'/e/'+id).toPromise();
  }
  }
  gethrmsstatutorydetailsByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsstatutorydetail'+'/'+id).toPromise();
  }
  }

  deletehrmsstatutorydetail(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntirehrmsURL + '/hrmsstatutorydetail'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntirehrmsURL + '/hrmsstatutorydetail')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

