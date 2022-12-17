import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { erpmaterialrequestdetail } from '../model/erpmaterialrequestdetail.model';
import { environment } from '../../environments/environment';
import { IerpmaterialrequestdetailResponse } from '../model/erpmaterialrequestdetail.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class erpmaterialrequestdetailService {
  formData: erpmaterialrequestdetail;
  readonly rootURL = AppConstants.baseURL;
  list: erpmaterialrequestdetail[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdateerpmaterialrequestdetails():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntireprocurementURL + '/erpmaterialrequestdetail', body);
  }
  }

  saveOrUpdateerpmaterialrequestdetailsList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntireprocurementURL + '/erpmaterialrequestdetail', body);
  }
  }

  geterpmaterialrequestdetailsList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erpmaterialrequestdetail').toPromise();
  }
  }
  getListBymrsdetailid(mrsdetailid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erpmaterialrequestdetail'+'/mrsdetailid/'+mrsdetailid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erpmaterialrequestdetail'+'/param/'+key).toPromise();
  }
  }


  geterpmaterialrequestdetailsByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erpmaterialrequestdetail'+'/e/'+id).toPromise();
  }
  }
  geterpmaterialrequestdetailsByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erpmaterialrequestdetail'+'/'+id).toPromise();
  }
  }

  deleteerpmaterialrequestdetail(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntireprocurementURL + '/erpmaterialrequestdetail'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntireprocurementURL + '/erpmaterialrequestdetail')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

