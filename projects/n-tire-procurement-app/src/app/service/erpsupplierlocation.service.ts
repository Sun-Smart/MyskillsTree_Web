import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { erpsupplierlocation } from '../model/erpsupplierlocation.model';
import { environment } from '../../environments/environment';
import { IerpsupplierlocationResponse } from '../model/erpsupplierlocation.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class erpsupplierlocationService {
  formData: erpsupplierlocation;
  readonly rootURL = AppConstants.baseURL;
  list: erpsupplierlocation[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdateerpsupplierlocations():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntireprocurementURL + '/erpsupplierlocation', body);
  }
  }

  saveOrUpdateerpsupplierlocationsList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntireprocurementURL + '/erpsupplierlocation', body);
  }
  }

  geterpsupplierlocationsList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erpsupplierlocation').toPromise();
  }
  }
  getListByeslid(eslid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erpsupplierlocation'+'/eslid/'+eslid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erpsupplierlocation'+'/param/'+key).toPromise();
  }
  }


  geterpsupplierlocationsByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erpsupplierlocation'+'/e/'+id).toPromise();
  }
  }
  geterpsupplierlocationsByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erpsupplierlocation'+'/'+id).toPromise();
  }
  }

  deleteerpsupplierlocation(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntireprocurementURL + '/erpsupplierlocation'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntireprocurementURL + '/erpsupplierlocation')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

