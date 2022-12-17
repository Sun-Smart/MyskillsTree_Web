import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { bodynamicformdetail } from '../model/bodynamicformdetail.model';
import { environment } from '../../environments/environment';
import { IbodynamicformdetailResponse } from '../model/bodynamicformdetail.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../shared/helper'
import { SessionService } from '../pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class bodynamicformdetailService {
  formData: bodynamicformdetail;
  readonly rootURL = AppConstants.baseURL;
  list: bodynamicformdetail[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatebodynamicformdetails():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntireboURL + '/bodynamicformdetail', body);
  }
  }

  saveOrUpdatebodynamicformdetailsList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntireboURL + '/bodynamicformdetail', body);
  }
  }

  getbodynamicformdetailsList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/bodynamicformdetail').toPromise();
  }
  }
  getListByformdetailid(formdetailid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/bodynamicformdetail'+'/formdetailid/'+formdetailid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/bodynamicformdetail'+'/param/'+key).toPromise();
  }
  }


  getbodynamicformdetailsByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/bodynamicformdetail'+'/e/'+id).toPromise();
  }
  }
  getbodynamicformdetailsByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/bodynamicformdetail'+'/'+id).toPromise();
  }
  }

  deletebodynamicformdetail(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntireboURL + '/bodynamicformdetail'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntireboURL + '/bodynamicformdetail')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

