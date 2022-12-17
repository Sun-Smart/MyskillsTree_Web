import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { mstsegment } from '../model/mstsegment.model';
import { mstcategory } from '../model/mstcategory.model';
import { environment } from '../../environments/environment';
import { ImstsegmentResponse } from '../model/mstsegment.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants,DropDownValues} from '../../../../n-tire-biz-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-biz-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class mstsegmentService {
  readonly rootURL = AppConstants.baseURL;

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdate_mstsegments(formData,  mstcategories,):any {
  if (this.valid()){
    var body = {
      ...formData,
      mstcategories: mstcategories.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
    };
    return this.http.post(AppConstants.ntirebizURL + '/mstsegment', body);
  }
  }

  getDefaultData():any {
  if (this.valid()){
    return this.http.get(AppConstants.ntirebizURL + '/mstsegment/getdefaultdata').toPromise();
  }
  }
  get_mstsegments_List():any {
  if (this.valid()){
    return this.http.get(AppConstants.ntirebizURL + '/mstsegment').toPromise();
  }
  }
  getListBy_segmentid(segmentid:number):any {
  if (this.valid()){
    return this.http.get(AppConstants.ntirebizURL + '/mstsegment/segmentid/'+segmentid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){
    return this.http.get(AppConstants.ntirebizURL + '/mstsegment/param/'+key).toPromise();
  }
  }


  get_mstsegments_ByEID(id:any):any {
  if (this.valid()){
    return this.http.get(AppConstants.ntirebizURL + '/mstsegment/e/'+id).toPromise();
  }
  }
  get_mstsegments_ByID(id:number):any {
  if (this.valid()){
    return this.http.get(AppConstants.ntirebizURL + '/mstsegment/'+id).toPromise();
  }
  }

  delete_mstsegment(id:number):any {
  if (this.valid()){
    return this.http.delete(AppConstants.ntirebizURL + '/mstsegment/'+id).toPromise();
  }





  }
search(filter: {name: string} = {name: ''}, page = 1): Observable<ImstsegmentResponse> {
return this.http.get<ImstsegmentResponse>(AppConstants.ntirebizURL+'/mstsegment')
.pipe(
tap((response: ImstsegmentResponse) => {
console.log(response);
//debugger;
var response1;
response1=response;
response.results = response1.map(mstsegment => new mstsegment(mstsegment.segmentid,mstsegment.code,mstsegment.name,mstsegment.status,""))
// Not filtering in the server since in-memory-web-api has somewhat restricted api
.filter(mstsegment => mstsegment.name.includes(filter.name))

return response;
})
);
}



}

