import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { erprfqmaster } from '../model/erprfqmaster.model';
import { erprfqsupplier } from '../model/erprfqsupplier.model';
import { erprfqdetail } from '../model/erprfqdetail.model';
import { erppurchaserequestdetail } from '../model/erppurchaserequestdetail.model';
import { environment } from '../../environments/environment';
import { IerprfqmasterResponse } from '../model/erprfqmaster.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class erprfqmasterService {
  formData: erprfqmaster;
  readonly rootURL = AppConstants.baseURL;
  list: erprfqmaster[];
  erprfqsuppliers: erprfqsupplier[]=[];
  erprfqdetails: erprfqdetail[]=[];
  erppurchaserequestdetails: erppurchaserequestdetail[]=[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdateerprfqmasters():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
      erprfqsuppliers: this.erprfqsuppliers.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
      erprfqdetails: this.erprfqdetails.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
      erppurchaserequestdetails: this.erppurchaserequestdetails.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
    };
    return this.http.post(AppConstants.ntireprocurementURL + '/erprfqmaster', body);
  }
  }

  saveOrUpdateerprfqmastersList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntireprocurementURL + '/erprfqmaster', body);
  }
  }

  geterprfqmastersList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erprfqmaster').toPromise();
  }
  }
  getListByrfqid(rfqid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erprfqmaster'+'/rfqid/'+rfqid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erprfqmaster'+'/param/'+key).toPromise();
  }
  }


  geterprfqmastersByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erprfqmaster'+'/e/'+id).toPromise();
  }
  }
  geterprfqmastersByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erprfqmaster'+'/'+id).toPromise();
  }
  }

  deleteerprfqmaster(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntireprocurementURL + '/erprfqmaster'+'/'+id).toPromise();
  }
  }
clearList(){
this.erprfqsuppliers = [];
this.erprfqdetails = [];
this.erppurchaserequestdetails = [];
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntireprocurementURL + '/erprfqmaster')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

