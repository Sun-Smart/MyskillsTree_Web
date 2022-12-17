import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { hrmsemployeeearningvoucher } from '../model/hrmsemployeeearningvoucher.model';
import { environment } from '../../environments/environment';
import { IhrmsemployeeearningvoucherResponse } from '../model/hrmsemployeeearningvoucher.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class hrmsemployeeearningvoucherService {
  formData: hrmsemployeeearningvoucher;
  readonly rootURL = AppConstants.baseURL;
  list: hrmsemployeeearningvoucher[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatehrmsemployeeearningvouchers():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntirehrmsURL + '/hrmsemployeeearningvoucher', body);
  }
  }

  saveOrUpdatehrmsemployeeearningvouchersList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntirehrmsURL + '/hrmsemployeeearningvoucher', body);
  }
  }

  gethrmsemployeeearningvouchersList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeeearningvoucher').toPromise();
  }
  }
  getListByvoucherid(voucherid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeeearningvoucher'+'/voucherid/'+voucherid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeeearningvoucher'+'/param/'+key).toPromise();
  }
  }


  gethrmsemployeeearningvouchersByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeeearningvoucher'+'/e/'+id).toPromise();
  }
  }
  gethrmsemployeeearningvouchersByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeeearningvoucher'+'/'+id).toPromise();
  }
  }

  deletehrmsemployeeearningvoucher(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntirehrmsURL + '/hrmsemployeeearningvoucher'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeeearningvoucher')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

