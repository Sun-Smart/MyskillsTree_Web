import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { dmsdocumentfield } from '../model/dmsdocumentfield.model';
import { environment } from '../../environments/environment';
import { IdmsdocumentfieldResponse } from '../model/dmsdocumentfield.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class dmsdocumentfieldService {
  formData: dmsdocumentfield;
  readonly rootURL = AppConstants.baseURL;
  list: dmsdocumentfield[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatedmsdocumentfields():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntiredmsURL + '/dmsdocumentfield', body);
  }
  }

  saveOrUpdatedmsdocumentfieldsList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntiredmsURL + '/dmsdocumentfield', body);
  }
  }

  getdmsdocumentfieldsList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntiredmsURL + '/dmsdocumentfield').toPromise();
  }
  }
  getListBypropertyid(propertyid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntiredmsURL + '/dmsdocumentfield'+'/propertyid/'+propertyid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntiredmsURL + '/dmsdocumentfield'+'/param/'+key).toPromise();
  }
  }


  getdmsdocumentfieldsByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntiredmsURL + '/dmsdocumentfield'+'/e/'+id).toPromise();
  }
  }
  getdmsdocumentfieldsByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntiredmsURL + '/dmsdocumentfield'+'/'+id).toPromise();
  }
  }

  deletedmsdocumentfield(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntiredmsURL + '/dmsdocumentfield'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntiredmsURL + '/dmsdocumentfield')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

