import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { erpmaterialrequest } from '../model/erpmaterialrequest.model';
import { erpmaterialrequestdetail } from '../model/erpmaterialrequestdetail.model';
import { environment } from '../../environments/environment';
import { IerpmaterialrequestResponse } from '../model/erpmaterialrequest.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class erpmaterialrequestService {
  formData: erpmaterialrequest;
  readonly rootURL = AppConstants.baseURL;
  list: erpmaterialrequest[];
  erpmaterialrequestdetails: erpmaterialrequestdetail[]=[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdateerpmaterialrequests():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
      erpmaterialrequestdetails: this.erpmaterialrequestdetails.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
    };
    return this.http.post(AppConstants.ntireprocurementURL + '/erpmaterialrequest', body);
  }
  }

  saveOrUpdateerpmaterialrequestsList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntireprocurementURL + '/erpmaterialrequest', body);
  }
  }

  geterpmaterialrequestsList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erpmaterialrequest').toPromise();
  }
  }
  getListBymrsid(mrsid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erpmaterialrequest'+'/mrsid/'+mrsid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erpmaterialrequest'+'/param/'+key).toPromise();
  }
  }


  geterpmaterialrequestsByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erpmaterialrequest'+'/e/'+id).toPromise();
  }
  }
  geterpmaterialrequestsByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erpmaterialrequest'+'/'+id).toPromise();
  }
  }

  deleteerpmaterialrequest(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntireprocurementURL + '/erpmaterialrequest'+'/'+id).toPromise();
  }
  }
clearList(){
this.erpmaterialrequestdetails = [];
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntireprocurementURL + '/erpmaterialrequest')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

