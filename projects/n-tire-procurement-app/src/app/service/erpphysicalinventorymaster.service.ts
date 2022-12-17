import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { erpphysicalinventorymaster } from '../model/erpphysicalinventorymaster.model';
import { erpphysicalinventorydetail } from '../model/erpphysicalinventorydetail.model';
import { environment } from '../../environments/environment';
import { IerpphysicalinventorymasterResponse } from '../model/erpphysicalinventorymaster.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class erpphysicalinventorymasterService {
  formData: erpphysicalinventorymaster;
  readonly rootURL = AppConstants.baseURL;
  list: erpphysicalinventorymaster[];
  erpphysicalinventorydetails: erpphysicalinventorydetail[]=[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdateerpphysicalinventorymasters():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
      erpphysicalinventorydetails: this.erpphysicalinventorydetails.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
    };
    return this.http.post(AppConstants.ntireprocurementURL + '/erpphysicalinventorymaster', body);
  }
  }

  saveOrUpdateerpphysicalinventorymastersList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntireprocurementURL + '/erpphysicalinventorymaster', body);
  }
  }

  geterpphysicalinventorymastersList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erpphysicalinventorymaster').toPromise();
  }
  }
  getListBypiid(piid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erpphysicalinventorymaster'+'/piid/'+piid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erpphysicalinventorymaster'+'/param/'+key).toPromise();
  }
  }


  geterpphysicalinventorymastersByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erpphysicalinventorymaster'+'/e/'+id).toPromise();
  }
  }
  geterpphysicalinventorymastersByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erpphysicalinventorymaster'+'/'+id).toPromise();
  }
  }

  deleteerpphysicalinventorymaster(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntireprocurementURL + '/erpphysicalinventorymaster'+'/'+id).toPromise();
  }
  }
clearList(){
this.erpphysicalinventorydetails = [];
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntireprocurementURL + '/erpphysicalinventorymaster')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

