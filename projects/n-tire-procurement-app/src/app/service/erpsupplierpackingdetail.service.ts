import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { erpsupplierpackingdetail } from '../model/erpsupplierpackingdetail.model';
import { erpsupplierpackingitem } from '../model/erpsupplierpackingitem.model';
import { environment } from '../../environments/environment';
import { IerpsupplierpackingdetailResponse } from '../model/erpsupplierpackingdetail.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class erpsupplierpackingdetailService {
  formData: erpsupplierpackingdetail;
  readonly rootURL = AppConstants.baseURL;
  list: erpsupplierpackingdetail[];
  erpsupplierpackingitems: erpsupplierpackingitem[]=[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdateerpsupplierpackingdetails():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
      erpsupplierpackingitems: this.erpsupplierpackingitems.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
    };
    return this.http.post(AppConstants.ntireprocurementURL + '/erpsupplierpackingdetail', body);
  }
  }

  saveOrUpdateerpsupplierpackingdetailsList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntireprocurementURL + '/erpsupplierpackingdetail', body);
  }
  }

  geterpsupplierpackingdetailsList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erpsupplierpackingdetail').toPromise();
  }
  }
  getListBysupplierpkgdetailid(supplierpkgdetailid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erpsupplierpackingdetail'+'/supplierpkgdetailid/'+supplierpkgdetailid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erpsupplierpackingdetail'+'/param/'+key).toPromise();
  }
  }


  geterpsupplierpackingdetailsByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erpsupplierpackingdetail'+'/e/'+id).toPromise();
  }
  }
  geterpsupplierpackingdetailsByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erpsupplierpackingdetail'+'/'+id).toPromise();
  }
  }

  deleteerpsupplierpackingdetail(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntireprocurementURL + '/erpsupplierpackingdetail'+'/'+id).toPromise();
  }
  }
clearList(){
this.erpsupplierpackingitems = [];
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntireprocurementURL + '/erpsupplierpackingdetail')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

