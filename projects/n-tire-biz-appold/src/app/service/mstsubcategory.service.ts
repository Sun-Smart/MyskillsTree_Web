import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { mstsubcategory } from '../model/mstsubcategory.model';
import { environment } from '../../environments/environment';
import { ImstsubcategoryResponse } from '../model/mstsubcategory.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants,DropDownValues} from '../../../../n-tire-biz-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-biz-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class mstsubcategoryService {
  readonly rootURL = AppConstants.baseURL;

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdate_mstsubcategories(formData):any {
  if (this.valid()){ 
    var body = {
      ...formData,
    };
    return this.http.post(AppConstants.ntirebizURL + '/mstsubcategory', body);
  }
  }

  getDefaultData():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirebizURL + '/mstsubcategory/getdefaultdata').toPromise();
  }
  }
  get_mstsubcategories_List():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirebizURL + '/mstsubcategory').toPromise();
  }
  }
  getListBy_subcategoryid(subcategoryid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirebizURL + '/mstsubcategory/subcategoryid/'+subcategoryid).toPromise();
  }
  }

  getListBy_categoryid(categoryid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirebizURL + '/mstsubcategory/categoryid/'+categoryid).toPromise();
  }
  }

  getListBy_segmentid(segmentid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirebizURL + '/mstsubcategory/segmentid/'+segmentid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirebizURL + '/mstsubcategory/param/'+key).toPromise();
  }
  }


  get_mstsubcategories_ByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirebizURL + '/mstsubcategory/e/'+id).toPromise();
  }
  }
  get_mstsubcategories_ByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirebizURL + '/mstsubcategory/'+id).toPromise();
  }
  }

  delete_mstsubcategory(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntirebizURL + '/mstsubcategory/'+id).toPromise();
  }
  }
search(filter: {name: string} = {name: ''}, page = 1): Observable<ImstsubcategoryResponse> {
return this.http.get<ImstsubcategoryResponse>(AppConstants.ntirebizURL+'/mstsubcategory')
.pipe(
tap((response: ImstsubcategoryResponse) => {
console.log(response);
//debugger;
var response1;
response1=response;
response.results = response1.map(mstsubcategory => new mstsubcategory(mstsubcategory.subcategoryid,mstsubcategory.code,mstsubcategory.name,mstsubcategory.categoryid,mstsubcategory.segmentid,mstsubcategory.segmentiddesc,mstsubcategory.status))
// Not filtering in the server since in-memory-web-api has somewhat restricted api
.filter(mstsubcategory => mstsubcategory.name.includes(filter.name))

return response;
})
);
}


    getList_segmentid():any{
      return this.http.get(AppConstants.ntirebizURL + '/mstsubcategory/getList_segmentid').toPromise();
    }


}

