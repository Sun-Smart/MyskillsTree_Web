import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { camsassetreadinghistory } from '../model/camsassetreadinghistory.model';
import { environment } from '../../environments/environment';
import { IcamsassetreadinghistoryResponse } from '../model/camsassetreadinghistory.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class camsassetreadinghistoryService {
  formData: camsassetreadinghistory;
  readonly rootURL = AppConstants.baseURL;
  list: camsassetreadinghistory[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatecamsassetreadinghistories():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntirecamsURL + '/camsassetreadinghistory', body);
  }
  }

  saveOrUpdatecamsassetreadinghistoriesList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntirecamsURL + '/camsassetreadinghistory', body);
  }
  }

  getcamsassetreadinghistoriesList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecamsURL + '/camsassetreadinghistory').toPromise();
  }
  }
  getListByhistoryid(historyid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecamsURL + '/camsassetreadinghistory'+'/historyid/'+historyid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecamsURL + '/camsassetreadinghistory'+'/param/'+key).toPromise();
  }
  }


  getcamsassetreadinghistoriesByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecamsURL + '/camsassetreadinghistory'+'/e/'+id).toPromise();
  }
  }
  getcamsassetreadinghistoriesByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecamsURL + '/camsassetreadinghistory'+'/'+id).toPromise();
  }
  }

  deletecamsassetreadinghistory(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntirecamsURL + '/camsassetreadinghistory'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntirecamsURL + '/camsassetreadinghistory')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

