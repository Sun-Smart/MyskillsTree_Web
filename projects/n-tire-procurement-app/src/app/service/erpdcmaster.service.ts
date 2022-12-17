import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { erpdcmaster } from '../model/erpdcmaster.model';
import { erpdcdetail } from '../model/erpdcdetail.model';
import { environment } from '../../environments/environment';
import { IerpdcmasterResponse } from '../model/erpdcmaster.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class erpdcmasterService {
  formData: erpdcmaster;
  readonly rootURL = AppConstants.baseURL;
  list: erpdcmaster[];
  erpdcdetails: erpdcdetail[]=[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdateerpdcmasters():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
      erpdcdetails: this.erpdcdetails.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
    };
    return this.http.post(AppConstants.ntireprocurementURL + '/erpdcmaster', body);
  }
  }

  saveOrUpdateerpdcmastersList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntireprocurementURL + '/erpdcmaster', body);
  }
  }

  geterpdcmastersList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erpdcmaster').toPromise();
  }
  }
  getListBydcid(dcid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erpdcmaster'+'/dcid/'+dcid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erpdcmaster'+'/param/'+key).toPromise();
  }
  }


  geterpdcmastersByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erpdcmaster'+'/e/'+id).toPromise();
  }
  }
  geterpdcmastersByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erpdcmaster'+'/'+id).toPromise();
  }
  }

  deleteerpdcmaster(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntireprocurementURL + '/erpdcmaster'+'/'+id).toPromise();
  }
  }
clearList(){
this.erpdcdetails = [];
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntireprocurementURL + '/erpdcmaster')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

