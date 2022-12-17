import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { erpcontractorderclause } from '../model/erpcontractorderclause.model';
import { environment } from '../../environments/environment';
import { IerpcontractorderclauseResponse } from '../model/erpcontractorderclause.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class erpcontractorderclauseService {
  formData: erpcontractorderclause;
  readonly rootURL = AppConstants.baseURL;
  list: erpcontractorderclause[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdateerpcontractorderclauses():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntireprocurementURL + '/erpcontractorderclause', body);
  }
  }

  saveOrUpdateerpcontractorderclausesList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntireprocurementURL + '/erpcontractorderclause', body);
  }
  }

  geterpcontractorderclausesList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erpcontractorderclause').toPromise();
  }
  }
  getListBycontractclauseid(contractclauseid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erpcontractorderclause'+'/contractclauseid/'+contractclauseid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erpcontractorderclause'+'/param/'+key).toPromise();
  }
  }


  geterpcontractorderclausesByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erpcontractorderclause'+'/e/'+id).toPromise();
  }
  }
  geterpcontractorderclausesByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erpcontractorderclause'+'/'+id).toPromise();
  }
  }

  deleteerpcontractorderclause(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntireprocurementURL + '/erpcontractorderclause'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntireprocurementURL + '/erpcontractorderclause')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

