import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { erpproductfeatureparameter } from '../model/erpproductfeatureparameter.model';
import { environment } from '../../environments/environment';
import { IerpproductfeatureparameterResponse } from '../model/erpproductfeatureparameter.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class erpproductfeatureparameterService {
  formData: erpproductfeatureparameter;
  readonly rootURL = AppConstants.baseURL;
  list: erpproductfeatureparameter[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdateerpproductfeatureparameters():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntireprocurementURL + '/erpproductfeatureparameter', body);
  }
  }

  saveOrUpdateerpproductfeatureparametersList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntireprocurementURL + '/erpproductfeatureparameter', body);
  }
  }

  geterpproductfeatureparametersList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erpproductfeatureparameter').toPromise();
  }
  }
  getListByepfpid(epfpid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erpproductfeatureparameter'+'/epfpid/'+epfpid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erpproductfeatureparameter'+'/param/'+key).toPromise();
  }
  }


  geterpproductfeatureparametersByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erpproductfeatureparameter'+'/e/'+id).toPromise();
  }
  }
  geterpproductfeatureparametersByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erpproductfeatureparameter'+'/'+id).toPromise();
  }
  }

  deleteerpproductfeatureparameter(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntireprocurementURL + '/erpproductfeatureparameter'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntireprocurementURL + '/erpproductfeatureparameter')
.toPromise()
.then(res => this.list = res as any[]);
}
}
search(filter: {name: string} = {name: ''}, page = 1): Observable<IerpproductfeatureparameterResponse> {
return this.http.get<IerpproductfeatureparameterResponse>(AppConstants.ntireprocurementURL+'/erpproductfeatureparameter')
.pipe(
tap((response: IerpproductfeatureparameterResponse) => {
console.log(response);
//debugger;
var response1;
response1=response;
response.results = response1.map(erpproductfeatureparameter => new erpproductfeatureparameter(erpproductfeatureparameter.epfpid,erpproductfeatureparameter.featurename,erpproductfeatureparameter.productid,erpproductfeatureparameter.productiddesc,erpproductfeatureparameter.itemcategoryid,erpproductfeatureparameter.itemcategoryiddesc,erpproductfeatureparameter.itemsubcategoryid,erpproductfeatureparameter.itemsubcategoryiddesc,erpproductfeatureparameter.customfieldid,erpproductfeatureparameter.customfieldiddesc,erpproductfeatureparameter.status))
// Not filtering in the server since in-memory-web-api has somewhat restricted api
.filter(erpproductfeatureparameter => erpproductfeatureparameter.featurename.includes(filter.name))

return response;
})
);
}



}

