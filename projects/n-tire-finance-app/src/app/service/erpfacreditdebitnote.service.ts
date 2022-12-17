import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { erpfacreditdebitnote } from '../model/erpfacreditdebitnote.model';
import { environment } from '../../environments/environment';
import { IerpfacreditdebitnoteResponse } from '../model/erpfacreditdebitnote.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class erpfacreditdebitnoteService {
  formData: erpfacreditdebitnote;
  readonly rootURL = AppConstants.ntirefinanceURL;
  list: erpfacreditdebitnote[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdateerpfacreditdebitnotes():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntirefinanceURL + '/erpfacreditdebitnote', body);
  }
  }

  saveOrUpdateerpfacreditdebitnotesList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntirefinanceURL + '/erpfacreditdebitnote', body);
  }
  }

  geterpfacreditdebitnotesList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirefinanceURL + '/erpfacreditdebitnote').toPromise();
  }
  }
  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirefinanceURL + '/erpfacreditdebitnote'+'/param/'+key).toPromise();
  }
  }


  geterpfacreditdebitnotesByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirefinanceURL + '/erpfacreditdebitnote'+'/e/'+id).toPromise();
  }
  }
  geterpfacreditdebitnotesByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirefinanceURL + '/erpfacreditdebitnote'+'/'+id).toPromise();
  }
  }

  deleteerpfacreditdebitnote(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntirefinanceURL + '/erpfacreditdebitnote'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntirefinanceURL + '/erpfacreditdebitnote')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

