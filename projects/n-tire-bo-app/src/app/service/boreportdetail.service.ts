import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { boreportdetail } from '../model/boreportdetail.model';
import { environment } from '../../environments/environment';
import { IboreportdetailResponse } from '../model/boreportdetail.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../shared/helper'
import { SessionService } from '../pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class boreportdetailService {
  formData: boreportdetail;
  readonly rootURL = AppConstants.baseURL;
  list: boreportdetail[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdateboreportdetails():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntireboURL + '/boreportdetail', body);
  }
  }

  saveOrUpdateboreportdetailsList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntireboURL + '/boreportdetail', body);
  }
  }

  getboreportdetailsList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/boreportdetail').toPromise();
  }
  }
  getListByreportdetailid(reportdetailid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/boreportdetail'+'/reportdetailid/'+reportdetailid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/boreportdetail'+'/param/'+key).toPromise();
  }
  }


  getboreportdetailsByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/boreportdetail'+'/e/'+id).toPromise();
  }
  }
  getboreportdetailsByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/boreportdetail'+'/'+id).toPromise();
  }
  }

  deleteboreportdetail(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntireboURL + '/boreportdetail'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntireboURL + '/boreportdetail')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

