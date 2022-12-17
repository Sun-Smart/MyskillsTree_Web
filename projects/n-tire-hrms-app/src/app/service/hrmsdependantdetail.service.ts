import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { hrmsdependantdetail } from '../model/hrmsdependantdetail.model';
import { environment } from '../../environments/environment';
import { IhrmsdependantdetailResponse } from '../model/hrmsdependantdetail.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class hrmsdependantdetailService {
  formData: hrmsdependantdetail;
  readonly rootURL = AppConstants.baseURL;
  list: hrmsdependantdetail[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatehrmsdependantdetails():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntirehrmsURL + '/hrmsdependantdetail', body);
  }
  }

  saveOrUpdatehrmsdependantdetailsList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntirehrmsURL + '/hrmsdependantdetail', body);
  }
  }

  gethrmsdependantdetailsList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsdependantdetail').toPromise();
  }
  }
  getListBydependentid(dependentid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsdependantdetail'+'/dependentid/'+dependentid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsdependantdetail'+'/param/'+key).toPromise();
  }
  }


  gethrmsdependantdetailsByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsdependantdetail'+'/e/'+id).toPromise();
  }
  }
  gethrmsdependantdetailsByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsdependantdetail'+'/'+id).toPromise();
  }
  }

  deletehrmsdependantdetail(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntirehrmsURL + '/hrmsdependantdetail'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntirehrmsURL + '/hrmsdependantdetail')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

