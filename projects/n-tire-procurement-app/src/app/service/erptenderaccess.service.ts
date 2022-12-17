import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { erptenderaccess } from '../model/erptenderaccess.model';
import { environment } from '../../environments/environment';
import { IerptenderaccessResponse } from '../model/erptenderaccess.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class erptenderaccessService {
  formData: erptenderaccess;
  readonly rootURL = AppConstants.baseURL;
  list: erptenderaccess[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdateerptenderaccesses():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntireprocurementURL + '/erptenderaccess', body);
  }
  }

  saveOrUpdateerptenderaccessesList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntireprocurementURL + '/erptenderaccess', body);
  }
  }

  geterptenderaccessesList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erptenderaccess').toPromise();
  }
  }
  getListByaccessid(accessid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erptenderaccess'+'/accessid/'+accessid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erptenderaccess'+'/param/'+key).toPromise();
  }
  }


  geterptenderaccessesByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erptenderaccess'+'/e/'+id).toPromise();
  }
  }
  geterptenderaccessesByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erptenderaccess'+'/'+id).toPromise();
  }
  }

  deleteerptenderaccess(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntireprocurementURL + '/erptenderaccess'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntireprocurementURL + '/erptenderaccess')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

