import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { erptendercompliance } from '../model/erptendercompliance.model';
import { environment } from '../../environments/environment';
import { IerptendercomplianceResponse } from '../model/erptendercompliance.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class erptendercomplianceService {
  formData: erptendercompliance;
  readonly rootURL = AppConstants.baseURL;
  list: erptendercompliance[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdateerptendercompliances():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntireprocurementURL + '/erptendercompliance', body);
  }
  }

  saveOrUpdateerptendercompliancesList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntireprocurementURL + '/erptendercompliance', body);
  }
  }

  geterptendercompliancesList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erptendercompliance').toPromise();
  }
  }
  getListBycomplianceid(complianceid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erptendercompliance'+'/complianceid/'+complianceid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erptendercompliance'+'/param/'+key).toPromise();
  }
  }


  geterptendercompliancesByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erptendercompliance'+'/e/'+id).toPromise();
  }
  }
  geterptendercompliancesByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erptendercompliance'+'/'+id).toPromise();
  }
  }

  deleteerptendercompliance(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntireprocurementURL + '/erptendercompliance'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntireprocurementURL + '/erptendercompliance')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

