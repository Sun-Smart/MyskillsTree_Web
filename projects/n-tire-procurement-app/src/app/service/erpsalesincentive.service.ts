import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { erpsalesincentive } from '../model/erpsalesincentive.model';
import { environment } from '../../environments/environment';
import { IerpsalesincentiveResponse } from '../model/erpsalesincentive.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class erpsalesincentiveService {
  formData: erpsalesincentive;
  readonly rootURL = AppConstants.baseURL;
  list: erpsalesincentive[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdateerpsalesincentives():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntireprocurementURL + '/erpsalesincentive', body);
  }
  }

  saveOrUpdateerpsalesincentivesList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntireprocurementURL + '/erpsalesincentive', body);
  }
  }

  geterpsalesincentivesList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erpsalesincentive').toPromise();
  }
  }
  getListByincentiveid(incentiveid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erpsalesincentive'+'/incentiveid/'+incentiveid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erpsalesincentive'+'/param/'+key).toPromise();
  }
  }


  geterpsalesincentivesByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erpsalesincentive'+'/e/'+id).toPromise();
  }
  }
  geterpsalesincentivesByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erpsalesincentive'+'/'+id).toPromise();
  }
  }

  deleteerpsalesincentive(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntireprocurementURL + '/erpsalesincentive'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntireprocurementURL + '/erpsalesincentive')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

