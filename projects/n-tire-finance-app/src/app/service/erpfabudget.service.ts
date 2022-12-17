import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { erpfabudget } from '../model/erpfabudget.model';
import { environment } from '../../environments/environment';
import { IerpfabudgetResponse } from '../model/erpfabudget.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class erpfabudgetService {
  formData: erpfabudget;
  readonly rootURL = AppConstants.ntirefinanceURL;
  list: erpfabudget[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdateerpfabudgets():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntirefinanceURL + '/erpfabudget', body);
  }
  }

  saveOrUpdateerpfabudgetsList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntirefinanceURL + '/erpfabudget', body);
  }
  }

  geterpfabudgetsList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirefinanceURL + '/erpfabudget').toPromise();
  }
  }
  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirefinanceURL + '/erpfabudget'+'/param/'+key).toPromise();
  }
  }


  geterpfabudgetsByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirefinanceURL + '/erpfabudget'+'/e/'+id).toPromise();
  }
  }
  geterpfabudgetsByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirefinanceURL + '/erpfabudget'+'/'+id).toPromise();
  }
  }

  deleteerpfabudget(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntirefinanceURL + '/erpfabudget'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntirefinanceURL + '/erpfabudget')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

