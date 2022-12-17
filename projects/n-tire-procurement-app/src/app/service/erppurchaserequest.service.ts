import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { erppurchaserequest } from '../model/erppurchaserequest.model';
import { erppurchaserequestdetail } from '../model/erppurchaserequestdetail.model';
import { environment } from '../../environments/environment';
import { IerppurchaserequestResponse } from '../model/erppurchaserequest.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class erppurchaserequestService {
  formData: erppurchaserequest;
  readonly rootURL = AppConstants.baseURL;
  list: erppurchaserequest[];
  erppurchaserequestdetails: erppurchaserequestdetail[]=[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdateerppurchaserequests():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
      erppurchaserequestdetails: this.erppurchaserequestdetails.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
    };
    return this.http.post(AppConstants.ntireprocurementURL + '/erppurchaserequest', body);
  }
  }

  saveOrUpdateerppurchaserequestsList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntireprocurementURL + '/erppurchaserequest', body);
  }
  }

  geterppurchaserequestsList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erppurchaserequest').toPromise();
  }
  }
  getListByprsid(prsid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erppurchaserequest'+'/prsid/'+prsid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erppurchaserequest'+'/param/'+key).toPromise();
  }
  }


  geterppurchaserequestsByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erppurchaserequest'+'/e/'+id).toPromise();
  }
  }
  geterppurchaserequestsByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erppurchaserequest'+'/'+id).toPromise();
  }
  }

  deleteerppurchaserequest(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntireprocurementURL + '/erppurchaserequest'+'/'+id).toPromise();
  }
  }
clearList(){
this.erppurchaserequestdetails = [];
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntireprocurementURL + '/erppurchaserequest')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

