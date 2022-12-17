import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { erpcontractclause } from '../model/erpcontractclause.model';
import { environment } from '../../environments/environment';
import { IerpcontractclauseResponse } from '../model/erpcontractclause.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class erpcontractclauseService {
  formData: erpcontractclause;
  readonly rootURL = AppConstants.baseURL;
  list: erpcontractclause[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdateerpcontractclauses():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntireprocurementURL + '/erpcontractclause', body);
  }
  }

  saveOrUpdateerpcontractclausesList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntireprocurementURL + '/erpcontractclause', body);
  }
  }

  geterpcontractclausesList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erpcontractclause').toPromise();
  }
  }
  getListByclauseid(clauseid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erpcontractclause'+'/clauseid/'+clauseid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erpcontractclause'+'/param/'+key).toPromise();
  }
  }


  geterpcontractclausesByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erpcontractclause'+'/e/'+id).toPromise();
  }
  }
  geterpcontractclausesByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erpcontractclause'+'/'+id).toPromise();
  }
  }

  deleteerpcontractclause(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntireprocurementURL + '/erpcontractclause'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntireprocurementURL + '/erpcontractclause')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

