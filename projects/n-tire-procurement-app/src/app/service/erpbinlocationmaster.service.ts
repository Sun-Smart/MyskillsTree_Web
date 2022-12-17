import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { erpbinlocationmaster } from '../model/erpbinlocationmaster.model';
import { environment } from '../../environments/environment';
import { IerpbinlocationmasterResponse } from '../model/erpbinlocationmaster.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class erpbinlocationmasterService {
  formData: erpbinlocationmaster;
  readonly rootURL = AppConstants.baseURL;
  list: erpbinlocationmaster[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdateerpbinlocationmasters():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntireprocurementURL + '/erpbinlocationmaster', body);
  }
  }

  saveOrUpdateerpbinlocationmastersList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntireprocurementURL + '/erpbinlocationmaster', body);
  }
  }

  geterpbinlocationmastersList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erpbinlocationmaster').toPromise();
  }
  }
  getListBybinid(binid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erpbinlocationmaster'+'/binid/'+binid).toPromise();
  }
  }

  getListBylocationid(locationid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erpbinlocationmaster'+'/locationid/'+locationid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erpbinlocationmaster'+'/param/'+key).toPromise();
  }
  }


  geterpbinlocationmastersByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erpbinlocationmaster'+'/e/'+id).toPromise();
  }
  }
  geterpbinlocationmastersByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erpbinlocationmaster'+'/'+id).toPromise();
  }
  }

  deleteerpbinlocationmaster(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntireprocurementURL + '/erpbinlocationmaster'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntireprocurementURL + '/erpbinlocationmaster')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

