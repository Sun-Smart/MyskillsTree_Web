import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { hrmsemployeedeductionvoucher } from '../model/hrmsemployeedeductionvoucher.model';
import { environment } from '../../environments/environment';
import { IhrmsemployeedeductionvoucherResponse } from '../model/hrmsemployeedeductionvoucher.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class hrmsemployeedeductionvoucherService {
  formData: hrmsemployeedeductionvoucher;
  readonly rootURL = AppConstants.baseURL;
  list: hrmsemployeedeductionvoucher[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatehrmsemployeedeductionvouchers():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntirehrmsURL + '/hrmsemployeedeductionvoucher', body);
  }
  }

  saveOrUpdatehrmsemployeedeductionvouchersList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntirehrmsURL + '/hrmsemployeedeductionvoucher', body);
  }
  }

  gethrmsemployeedeductionvouchersList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeedeductionvoucher').toPromise();
  }
  }
  getListByvoucherid(voucherid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeedeductionvoucher'+'/voucherid/'+voucherid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeedeductionvoucher'+'/param/'+key).toPromise();
  }
  }


  gethrmsemployeedeductionvouchersByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeedeductionvoucher'+'/e/'+id).toPromise();
  }
  }
  gethrmsemployeedeductionvouchersByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeedeductionvoucher'+'/'+id).toPromise();
  }
  }

  deletehrmsemployeedeductionvoucher(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntirehrmsURL + '/hrmsemployeedeductionvoucher'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeedeductionvoucher')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

