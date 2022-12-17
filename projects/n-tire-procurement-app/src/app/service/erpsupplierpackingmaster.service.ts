import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { erpsupplierpackingmaster } from '../model/erpsupplierpackingmaster.model';
import { erpsupplierpackingdetail } from '../model/erpsupplierpackingdetail.model';
import { environment } from '../../environments/environment';
import { IerpsupplierpackingmasterResponse } from '../model/erpsupplierpackingmaster.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class erpsupplierpackingmasterService {
  formData: erpsupplierpackingmaster;
  readonly rootURL = AppConstants.baseURL;
  list: erpsupplierpackingmaster[];
  erpsupplierpackingdetails: erpsupplierpackingdetail[]=[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdateerpsupplierpackingmasters():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
      erpsupplierpackingdetails: this.erpsupplierpackingdetails.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
    };
    return this.http.post(AppConstants.ntireprocurementURL + '/erpsupplierpackingmaster', body);
  }
  }

  saveOrUpdateerpsupplierpackingmastersList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntireprocurementURL + '/erpsupplierpackingmaster', body);
  }
  }

  geterpsupplierpackingmastersList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erpsupplierpackingmaster').toPromise();
  }
  }
  getListBysupplierpkgid(supplierpkgid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erpsupplierpackingmaster'+'/supplierpkgid/'+supplierpkgid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erpsupplierpackingmaster'+'/param/'+key).toPromise();
  }
  }


  geterpsupplierpackingmastersByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erpsupplierpackingmaster'+'/e/'+id).toPromise();
  }
  }
  geterpsupplierpackingmastersByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erpsupplierpackingmaster'+'/'+id).toPromise();
  }
  }

  deleteerpsupplierpackingmaster(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntireprocurementURL + '/erpsupplierpackingmaster'+'/'+id).toPromise();
  }
  }
clearList(){
this.erpsupplierpackingdetails = [];
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntireprocurementURL + '/erpsupplierpackingmaster')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

