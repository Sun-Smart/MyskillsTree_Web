import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { bodashboarddetail } from '../model/bodashboarddetail.model';
import { environment } from '../../environments/environment';
import { IbodashboarddetailResponse } from '../model/bodashboarddetail.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../shared/helper'
import { SessionService } from '../pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class bodashboarddetailService {
  formData: bodashboarddetail;
  readonly rootURL = AppConstants.baseURL;
  list: bodashboarddetail[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatebodashboarddetails():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntireboURL + '/bodashboarddetail', body);
  }
  }

  saveOrUpdatebodashboarddetailsList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntireboURL + '/bodashboarddetail', body);
  }
  }

  getbodashboarddetailsList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/bodashboarddetail').toPromise();
  }
  }
  getListBydashboarddetailid(dashboarddetailid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/bodashboarddetail'+'/dashboarddetailid/'+dashboarddetailid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/bodashboarddetail'+'/param/'+key).toPromise();
  }
  }


  getbodashboarddetailsByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/bodashboarddetail'+'/e/'+id).toPromise();
  }
  }
  getbodashboarddetailsByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/bodashboarddetail'+'/'+id).toPromise();
  }
  }

  deletebodashboarddetail(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntireboURL + '/bodashboarddetail'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntireboURL + '/bodashboarddetail')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

