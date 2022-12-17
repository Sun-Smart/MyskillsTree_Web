import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { mstcategory } from '../model/mstcategory.model';
import { mstsubcategory } from '../model/mstsubcategory.model';
import { environment } from '../../environments/environment';
import { ImstcategoryResponse } from '../model/mstcategory.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants,DropDownValues} from '../../../../n-tire-biz-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-biz-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class mstcategoryService {
  readonly rootURL = AppConstants.baseURL;

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdate_mstcategories(formData,  mstsubcategories,):any {
  if (this.valid()){
    var body = {
      ...formData,
      mstsubcategories: mstsubcategories.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
    };
    return this.http.post(AppConstants.ntirebizURL + '/mstcategory', body);
  }
  }

  getDefaultData():any {
  if (this.valid()){
    return this.http.get(AppConstants.ntirebizURL + '/mstcategory/getdefaultdata').toPromise();
  }
  }
  get_mstcategories_List():any {
  if (this.valid()){
    return this.http.get(AppConstants.ntirebizURL + '/mstcategory').toPromise();
  }
  }
  getListBy_categoryid(categoryid:number):any {
  if (this.valid()){
    return this.http.get(AppConstants.ntirebizURL + '/mstcategory/categoryid/'+categoryid).toPromise();
  }
  }

  getListBy_segmentid(segmentid:number):any {

  if (this.valid()){
    return this.http.get(AppConstants.ntirebizURL + '/mstcategory/segmentid/'+segmentid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){
    return this.http.get(AppConstants.ntirebizURL + '/mstcategory/param/'+key).toPromise();
  }
  }


  get_mstcategories_ByEID(id:any):any {
  if (this.valid()){
    return this.http.get(AppConstants.ntirebizURL + '/mstcategory/e/'+id).toPromise();
  }
  }
  get_mstcategories_ByID(id:number):any {
  if (this.valid()){
    return this.http.get(AppConstants.ntirebizURL + '/mstcategory/'+id).toPromise();
  }
  }

  delete_mstcategory(id:number):any {
  if (this.valid()){
    return this.http.delete(AppConstants.ntirebizURL + '/mstcategory/'+id).toPromise();
  }
  }
search(filter: {name: string} = {name: ''}, page = 1): Observable<ImstcategoryResponse> {
return this.http.get<ImstcategoryResponse>(AppConstants.ntirebizURL+'/mstcategory')
.pipe(
tap((response: ImstcategoryResponse) => {
console.log(response);
//debugger;
var response1;
response1=response;
response.results = response1.map(mstcategory => new mstcategory(mstcategory.categoryid,mstcategory.code,mstcategory.name,mstcategory.segmentid,mstcategory.status,""))
// Not filtering in the server since in-memory-web-api has somewhat restricted api
.filter(mstcategory => mstcategory.name.includes(filter.name))

return response;
})
);
}



}

