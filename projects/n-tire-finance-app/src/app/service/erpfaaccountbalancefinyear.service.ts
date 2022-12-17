import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { erpfaaccountbalancefinyear } from '../model/erpfaaccountbalancefinyear.model';
import { environment } from '../../environments/environment';
import { IerpfaaccountbalancefinyearResponse } from '../model/erpfaaccountbalancefinyear.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class erpfaaccountbalancefinyearService {
  formData: erpfaaccountbalancefinyear;
  readonly rootURL = AppConstants.ntirefinanceURL;
  list: erpfaaccountbalancefinyear[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdateerpfaaccountbalancefinyears():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntirefinanceURL + '/erpfaaccountbalancefinyear', body);
  }
  }

  saveOrUpdateerpfaaccountbalancefinyearsList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntirefinanceURL + '/erpfaaccountbalancefinyear', body);
  }
  }

  geterpfaaccountbalancefinyearsList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirefinanceURL + '/erpfaaccountbalancefinyear').toPromise();
  }
  }
  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirefinanceURL + '/erpfaaccountbalancefinyear'+'/param/'+key).toPromise();
  }
  }


  geterpfaaccountbalancefinyearsByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirefinanceURL + '/erpfaaccountbalancefinyear'+'/e/'+id).toPromise();
  }
  }
  geterpfaaccountbalancefinyearsByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirefinanceURL + '/erpfaaccountbalancefinyear'+'/'+id).toPromise();
  }
  }

  deleteerpfaaccountbalancefinyear(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntirefinanceURL + '/erpfaaccountbalancefinyear'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntirefinanceURL + '/erpfaaccountbalancefinyear')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

