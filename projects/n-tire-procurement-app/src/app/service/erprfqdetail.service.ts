import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { erprfqdetail } from '../model/erprfqdetail.model';
import { erprfqsupplier } from '../model/erprfqsupplier.model';
import { environment } from '../../environments/environment';
import { IerprfqdetailResponse } from '../model/erprfqdetail.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class erprfqdetailService {
  formData: erprfqdetail;
  readonly rootURL = AppConstants.baseURL;
  list: erprfqdetail[];
  erprfqsuppliers: erprfqsupplier[]=[];
  Inserterprfqsuppliers: erprfqsupplier[]=[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdateerprfqdetails():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
      erprfqsuppliers: this.Inserterprfqsuppliers.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
    };
    return this.http.post(AppConstants.ntireprocurementURL + '/erprfqdetail', body);
  }
  }

  saveOrUpdateerprfqdetailsList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntireprocurementURL + '/erprfqdetail', body);
  }
  }

  geterprfqdetailsList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erprfqdetail').toPromise();
  }
  }
  getListByrfqdetailid(rfqdetailid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erprfqdetail'+'/rfqdetailid/'+rfqdetailid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erprfqdetail'+'/param/'+key).toPromise();
  }
  }


  geterprfqdetailsByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erprfqdetail'+'/e/'+id).toPromise();
  }
  }
  geterprfqdetailsByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erprfqdetail'+'/'+id).toPromise();
  }
  }

  deleteerprfqdetail(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntireprocurementURL + '/erprfqdetail'+'/'+id).toPromise();
  }
  }
clearList(){
this.erprfqsuppliers = [];
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntireprocurementURL + '/erprfqdetail')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

