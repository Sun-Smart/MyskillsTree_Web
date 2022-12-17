import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { erpfajournalcostcenter } from '../model/erpfajournalcostcenter.model';
import { environment } from '../../environments/environment';
import { IerpfajournalcostcenterResponse } from '../model/erpfajournalcostcenter.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class erpfajournalcostcenterService {
  formData: erpfajournalcostcenter;
  readonly rootURL = AppConstants.ntirefinanceURL;
  list: erpfajournalcostcenter[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdateerpfajournalcostcenters():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntirefinanceURL + '/erpfajournalcostcenter', body);
  }
  }

  saveOrUpdateerpfajournalcostcentersList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntirefinanceURL + '/erpfajournalcostcenter', body);
  }
  }

  geterpfajournalcostcentersList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirefinanceURL + '/erpfajournalcostcenter').toPromise();
  }
  }
  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirefinanceURL + '/erpfajournalcostcenter'+'/param/'+key).toPromise();
  }
  }


  geterpfajournalcostcentersByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirefinanceURL + '/erpfajournalcostcenter'+'/e/'+id).toPromise();
  }
  }
  geterpfajournalcostcentersByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirefinanceURL + '/erpfajournalcostcenter'+'/'+id).toPromise();
  }
  }

  deleteerpfajournalcostcenter(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntirefinanceURL + '/erpfajournalcostcenter'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntirefinanceURL + '/erpfajournalcostcenter')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

