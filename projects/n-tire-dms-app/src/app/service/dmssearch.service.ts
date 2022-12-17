import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { dmssearch } from '../model/dmssearch.model';
import { environment } from '../../environments/environment';
import { IdmssearchResponse } from '../model/dmssearch.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class dmssearchService {
  formData: dmssearch;
  readonly rootURL = AppConstants.baseURL;
  list: dmssearch[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatedmssearches():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntiredmsURL + '/dmssearch', body);
  }
  }

  saveOrUpdatedmssearchesList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntiredmsURL + '/dmssearch', body);
  }
  }

  getdmssearchesList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntiredmsURL + '/dmssearch').toPromise();
  }
  }
  getListBysearchid(searchid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntiredmsURL + '/dmssearch'+'/searchid/'+searchid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntiredmsURL + '/dmssearch'+'/param/'+key).toPromise();
  }
  }


  getdmssearchesByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntiredmsURL + '/dmssearch'+'/e/'+id).toPromise();
  }
  }
  getdmssearchesByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntiredmsURL + '/dmssearch'+'/'+id).toPromise();
  }
  }

  deletedmssearch(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntiredmsURL + '/dmssearch'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntiredmsURL + '/dmssearch')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

