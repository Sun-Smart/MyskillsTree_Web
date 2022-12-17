import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { erpfacostcategory } from '../model/erpfacostcategory.model';
import { erpfacostcenter } from '../model/erpfacostcenter.model';
import { environment } from '../../environments/environment';
import { IerpfacostcategoryResponse } from '../model/erpfacostcategory.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class erpfacostcategoryService {
  formData: erpfacostcategory;
  readonly rootURL = AppConstants.ntirefinanceURL;
  erpfacostcenters: erpfacostcenter[]=[];
  list: erpfacostcategory[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdateerpfacostcategories():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
      erpfacostcenters: this.erpfacostcenters.filter(function(el) { return el!=undefined && Object.keys(el).length!=0; }),
    };
    return this.http.post(AppConstants.ntirefinanceURL + '/erpfacostcategory', body);
  }
  }

  saveOrUpdateerpfacostcategoriesList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntirefinanceURL + '/erpfacostcategory', body);
  }
  }

  geterpfacostcategoriesList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirefinanceURL + '/erpfacostcategory').toPromise();
  }
  }
  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirefinanceURL + '/erpfacostcategory'+'/param/'+key).toPromise();
  }
  }


  geterpfacostcategoriesByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirefinanceURL + '/erpfacostcategory'+'/e/'+id).toPromise();
  }
  }
  geterpfacostcategoriesByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirefinanceURL + '/erpfacostcategory'+'/'+id).toPromise();
  }
  }

  deleteerpfacostcategory(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntirefinanceURL + '/erpfacostcategory'+'/'+id).toPromise();
  }
  }
clearList(){
this.erpfacostcenters = [];
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntirefinanceURL + '/erpfacostcategory')
.toPromise()
.then(res => this.list = res as any[]);
}
}
search(filter: {name: string} = {name: ''}, page = 1): Observable<IerpfacostcategoryResponse> {
return this.http.get<IerpfacostcategoryResponse>(AppConstants.ntirefinanceURL+'/erpfacostcategory')
.pipe(
tap((response: IerpfacostcategoryResponse) => {
console.log(response);
//debugger;
var response1;
response1=response;
response.results = response1.map(erpfacostcategory => new erpfacostcategory(erpfacostcategory.ccid,erpfacostcategory.cccode,erpfacostcategory.ccname,erpfacostcategory.budget,erpfacostcategory.status,""))
// Not filtering in the server since in-memory-web-api has somewhat restricted api
.filter(erpfacostcategory => erpfacostcategory.ccname.includes(filter.name))

return response;
})
);
}



}

