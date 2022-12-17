import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { erpsupplierpackingitem } from '../model/erpsupplierpackingitem.model';
import { environment } from '../../environments/environment';
import { IerpsupplierpackingitemResponse } from '../model/erpsupplierpackingitem.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class erpsupplierpackingitemService {
  formData: erpsupplierpackingitem;
  readonly rootURL = AppConstants.baseURL;
  list: erpsupplierpackingitem[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdateerpsupplierpackingitems():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntireprocurementURL + '/erpsupplierpackingitem', body);
  }
  }

  saveOrUpdateerpsupplierpackingitemsList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntireprocurementURL + '/erpsupplierpackingitem', body);
  }
  }

  geterpsupplierpackingitemsList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erpsupplierpackingitem').toPromise();
  }
  }
  getListBysupplierpkgitemid(supplierpkgitemid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erpsupplierpackingitem'+'/supplierpkgitemid/'+supplierpkgitemid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erpsupplierpackingitem'+'/param/'+key).toPromise();
  }
  }


  geterpsupplierpackingitemsByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erpsupplierpackingitem'+'/e/'+id).toPromise();
  }
  }
  geterpsupplierpackingitemsByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erpsupplierpackingitem'+'/'+id).toPromise();
  }
  }

  deleteerpsupplierpackingitem(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntireprocurementURL + '/erpsupplierpackingitem'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntireprocurementURL + '/erpsupplierpackingitem')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

