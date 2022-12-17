import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { autodetail } from '../model/autodetail.model';
import { environment } from '../../environments/environment';
import { IautodetailResponse } from '../model/autodetail.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../shared/helper'
import { SessionService } from '../pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class autodetailService {
  formData: autodetail;
  readonly rootURL = AppConstants.baseURL;
  list: autodetail[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdateautodetails():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntireboURL + '/autodetail', body);
  }
  }

  saveOrUpdateautodetailsList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntireboURL + '/autodetail', body);
  }
  }

  getautodetailsList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/autodetail').toPromise();
  }
  }
  getListBydetailid(detailid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/autodetail'+'/detailid/'+detailid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/autodetail'+'/param/'+key).toPromise();
  }
  }


  getautodetailsByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/autodetail'+'/e/'+id).toPromise();
  }
  }
  getautodetailsByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/autodetail'+'/'+id).toPromise();
  }
  }

  deleteautodetail(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntireboURL + '/autodetail'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntireboURL + '/autodetail')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

