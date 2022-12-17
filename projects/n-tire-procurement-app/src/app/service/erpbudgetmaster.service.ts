import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { erpbudgetmaster } from '../model/erpbudgetmaster.model';
import { environment } from '../../environments/environment';
import { IerpbudgetmasterResponse } from '../model/erpbudgetmaster.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class erpbudgetmasterService {
  formData: erpbudgetmaster;
  readonly rootURL = AppConstants.baseURL;
  list: erpbudgetmaster[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdateerpbudgetmasters():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntireprocurementURL + '/erpbudgetmaster', body);
  }
  }

  saveOrUpdateerpbudgetmastersList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntireprocurementURL + '/erpbudgetmaster', body);
  }
  }

  geterpbudgetmastersList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erpbudgetmaster').toPromise();
  }
  }
  getListBybudgetid(budgetid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erpbudgetmaster'+'/budgetid/'+budgetid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erpbudgetmaster'+'/param/'+key).toPromise();
  }
  }


  geterpbudgetmastersByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erpbudgetmaster'+'/e/'+id).toPromise();
  }
  }
  geterpbudgetmastersByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erpbudgetmaster'+'/'+id).toPromise();
  }
  }

  deleteerpbudgetmaster(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntireprocurementURL + '/erpbudgetmaster'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntireprocurementURL + '/erpbudgetmaster')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

