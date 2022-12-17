import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { erpsupplierreference } from '../model/erpsupplierreference.model';
import { environment } from '../../environments/environment';
import { IerpsupplierreferenceResponse } from '../model/erpsupplierreference.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class erpsupplierreferenceService {
  formData: erpsupplierreference;
  readonly rootURL = AppConstants.baseURL;
  list: erpsupplierreference[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdateerpsupplierreferences():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntireprocurementURL + '/erpsupplierreference', body);
  }
  }

  saveOrUpdateerpsupplierreferencesList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntireprocurementURL + '/erpsupplierreference', body);
  }
  }

  geterpsupplierreferencesList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erpsupplierreference').toPromise();
  }
  }
  getListByesrid(esrid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erpsupplierreference'+'/esrid/'+esrid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erpsupplierreference'+'/param/'+key).toPromise();
  }
  }


  geterpsupplierreferencesByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erpsupplierreference'+'/e/'+id).toPromise();
  }
  }
  geterpsupplierreferencesByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erpsupplierreference'+'/'+id).toPromise();
  }
  }

  deleteerpsupplierreference(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntireprocurementURL + '/erpsupplierreference'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntireprocurementURL + '/erpsupplierreference')
.toPromise()
.then(res => this.list = res as any[]);
}
}
search(filter: {name: string} = {name: ''}, page = 1): Observable<IerpsupplierreferenceResponse> {
return this.http.get<IerpsupplierreferenceResponse>(AppConstants.ntireprocurementURL+'/erpsupplierreference')
.pipe(
tap((response: IerpsupplierreferenceResponse) => {
console.log(response);
//debugger;
var response1;
response1=response;
response.results = response1.map(erpsupplierreference => new erpsupplierreference(erpsupplierreference.esrid,erpsupplierreference.supplierid,erpsupplierreference.supplieriddesc,erpsupplierreference.customername,erpsupplierreference.companytype,erpsupplierreference.companytypedesc,erpsupplierreference.relationshipdetails,erpsupplierreference.effectivefrom,erpsupplierreference.referencedetails,erpsupplierreference.remarks,erpsupplierreference.attachment,erpsupplierreference.status))
// Not filtering in the server since in-memory-web-api has somewhat restricted api
.filter(erpsupplierreference => erpsupplierreference.referencedetails.includes(filter.name))

return response;
})
);
}



}

