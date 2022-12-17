import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { erpsupplieritemfeature } from '../model/erpsupplieritemfeature.model';
import { environment } from '../../environments/environment';
import { IerpsupplieritemfeatureResponse } from '../model/erpsupplieritemfeature.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class erpsupplieritemfeatureService {
  formData: erpsupplieritemfeature;
  readonly rootURL = AppConstants.baseURL;
  list: erpsupplieritemfeature[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdateerpsupplieritemfeatures():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntireprocurementURL + '/erpsupplieritemfeature', body);
  }
  }

  saveOrUpdateerpsupplieritemfeaturesList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntireprocurementURL + '/erpsupplieritemfeature', body);
  }
  }

  geterpsupplieritemfeaturesList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erpsupplieritemfeature').toPromise();
  }
  }
  getListByfeatureid(featureid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erpsupplieritemfeature'+'/featureid/'+featureid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erpsupplieritemfeature'+'/param/'+key).toPromise();
  }
  }


  geterpsupplieritemfeaturesByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erpsupplieritemfeature'+'/e/'+id).toPromise();
  }
  }
  geterpsupplieritemfeaturesByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erpsupplieritemfeature'+'/'+id).toPromise();
  }
  }

  deleteerpsupplieritemfeature(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntireprocurementURL + '/erpsupplieritemfeature'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntireprocurementURL + '/erpsupplieritemfeature')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

