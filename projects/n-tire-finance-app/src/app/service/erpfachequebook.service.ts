import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { erpfachequebook } from '../model/erpfachequebook.model';
import { environment } from '../../environments/environment';
import { IerpfachequebookResponse } from '../model/erpfachequebook.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class erpfachequebookService {
  formData: erpfachequebook;
  readonly rootURL = AppConstants.ntirefinanceURL;
  list: erpfachequebook[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdateerpfachequebooks():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntirefinanceURL + '/erpfachequebook', body);
  }
  }

  saveOrUpdateerpfachequebooksList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntirefinanceURL + '/erpfachequebook', body);
  }
  }

  geterpfachequebooksList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirefinanceURL + '/erpfachequebook').toPromise();
  }
  }
  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirefinanceURL + '/erpfachequebook'+'/param/'+key).toPromise();
  }
  }


  geterpfachequebooksByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirefinanceURL + '/erpfachequebook'+'/e/'+id).toPromise();
  }
  }
  geterpfachequebooksByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirefinanceURL + '/erpfachequebook'+'/'+id).toPromise();
  }
  }

  deleteerpfachequebook(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntirefinanceURL + '/erpfachequebook'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntirefinanceURL + '/erpfachequebook')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

