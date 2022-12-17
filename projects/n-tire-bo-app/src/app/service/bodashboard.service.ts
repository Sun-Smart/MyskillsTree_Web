import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { bodashboard } from '../model/bodashboard.model';
import { bodashboarddetail } from '../model/bodashboarddetail.model';
import { environment } from '../../environments/environment';
import { IbodashboardResponse } from '../model/bodashboard.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../shared/helper'
import { SessionService } from '../pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class bodashboardService {
  formData: bodashboard;
  readonly rootURL = AppConstants.baseURL;
  bodashboarddetails: bodashboarddetail[]=[];
  list: bodashboard[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatebodashboards():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
      bodashboarddetails: this.bodashboarddetails.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
    };
    return this.http.post(AppConstants.ntireboURL + '/bodashboard', body);
  }
  }

  saveOrUpdatebodashboardsList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntireboURL + '/bodashboard', body);
  }
  }

  getbodashboardsList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/bodashboard').toPromise();
  }
  }
  getListBydashboardid(dashboardid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/bodashboard'+'/dashboardid/'+dashboardid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/bodashboard'+'/param/'+key).toPromise();
  }
  }


  getbodashboardsByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/bodashboard'+'/e/'+id).toPromise();
  }
  }
  getbodashboardsByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/bodashboard'+'/'+id).toPromise();
  }
  }

  deletebodashboard(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntireboURL + '/bodashboard'+'/'+id).toPromise();
  }
  }
clearList(){
this.bodashboarddetails = [];
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntireboURL + '/bodashboard')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

