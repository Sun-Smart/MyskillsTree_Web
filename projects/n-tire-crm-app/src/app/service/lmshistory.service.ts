import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lmshistory } from '../model/lmshistory.model';
import { environment } from '../../environments/environment';
import { IlmshistoryResponse } from '../model/lmshistory.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class lmshistoryService {
  formData: lmshistory;
  readonly rootURL = AppConstants.baseURL;
  list: lmshistory[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatelmshistories():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntirecrmURL + '/lmshistory', body);
  }
  }

  saveOrUpdatelmshistoriesList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntirecrmURL + '/lmshistory', body);
  }
  }

  getlmshistoriesList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecrmURL + '/lmshistory').toPromise();
  }
  }
  getListByhistoryid(historyid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecrmURL + '/lmshistory'+'/historyid/'+historyid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecrmURL + '/lmshistory'+'/param/'+key).toPromise();
  }
  }


  getlmshistoriesByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecrmURL + '/lmshistory'+'/e/'+id).toPromise();
  }
  }
  getlmshistoriesByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecrmURL + '/lmshistory'+'/'+id).toPromise();
  }
  }

  deletelmshistory(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntirecrmURL + '/lmshistory'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntirecrmURL + '/lmshistory')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

