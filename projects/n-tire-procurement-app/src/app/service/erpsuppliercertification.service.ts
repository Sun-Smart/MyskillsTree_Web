import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { erpsuppliercertification } from '../model/erpsuppliercertification.model';
import { environment } from '../../environments/environment';
import { IerpsuppliercertificationResponse } from '../model/erpsuppliercertification.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class erpsuppliercertificationService {
  formData: erpsuppliercertification;
  readonly rootURL = AppConstants.baseURL;
  list: erpsuppliercertification[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdateerpsuppliercertifications():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntireprocurementURL + '/erpsuppliercertification', body);
  }
  }

  saveOrUpdateerpsuppliercertificationsList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntireprocurementURL + '/erpsuppliercertification', body);
  }
  }

  geterpsuppliercertificationsList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erpsuppliercertification').toPromise();
  }
  }
  getListBycertificationid(certificationid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erpsuppliercertification'+'/certificationid/'+certificationid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erpsuppliercertification'+'/param/'+key).toPromise();
  }
  }


  geterpsuppliercertificationsByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erpsuppliercertification'+'/e/'+id).toPromise();
  }
  }
  geterpsuppliercertificationsByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erpsuppliercertification'+'/'+id).toPromise();
  }
  }

  deleteerpsuppliercertification(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntireprocurementURL + '/erpsuppliercertification'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntireprocurementURL + '/erpsuppliercertification')
.toPromise()
.then(res => this.list = res as any[]);
}
}
search(filter: {name: string} = {name: ''}, page = 1): Observable<IerpsuppliercertificationResponse> {
return this.http.get<IerpsuppliercertificationResponse>(AppConstants.ntireprocurementURL+'/erpsuppliercertification')
.pipe(
tap((response: IerpsuppliercertificationResponse) => {
console.log(response);
//debugger;
var response1;
response1=response;
response.results = response1.map(erpsuppliercertification => new erpsuppliercertification(erpsuppliercertification.supplierid,erpsuppliercertification.supplieriddesc,erpsuppliercertification.certificationid,erpsuppliercertification.certificatecategory,erpsuppliercertification.certificatecategorydesc,erpsuppliercertification.certificatename,erpsuppliercertification.issuedate,erpsuppliercertification.expirydate,erpsuppliercertification.remarks,erpsuppliercertification.attachment,erpsuppliercertification.status))
// Not filtering in the server since in-memory-web-api has somewhat restricted api
.filter(erpsuppliercertification => erpsuppliercertification.certificatename.includes(filter.name))

return response;
})
);
}



}

