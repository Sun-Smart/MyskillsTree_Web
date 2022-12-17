import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { erpmaterialissuing } from '../model/erpmaterialissuing.model';
import { environment } from '../../environments/environment';
import { IerpmaterialissuingResponse } from '../model/erpmaterialissuing.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class erpmaterialissuingService {
  formData: erpmaterialissuing;
  readonly rootURL = AppConstants.baseURL;
  list: erpmaterialissuing[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdateerpmaterialissuings():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntireprocurementURL + '/erpmaterialissuing', body);
  }
  }

  saveOrUpdateerpmaterialissuingsList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntireprocurementURL + '/erpmaterialissuing', body);
  }
  }

  geterpmaterialissuingsList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erpmaterialissuing').toPromise();
  }
  }
  getListBymiid(miid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erpmaterialissuing'+'/miid/'+miid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erpmaterialissuing'+'/param/'+key).toPromise();
  }
  }


  geterpmaterialissuingsByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erpmaterialissuing'+'/e/'+id).toPromise();
  }
  }
  geterpmaterialissuingsByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erpmaterialissuing'+'/'+id).toPromise();
  }
  }

  deleteerpmaterialissuing(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntireprocurementURL + '/erpmaterialissuing'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntireprocurementURL + '/erpmaterialissuing')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

