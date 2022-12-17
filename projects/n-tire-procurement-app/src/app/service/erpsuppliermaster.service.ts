import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { erpsuppliermaster } from '../model/erpsuppliermaster.model';
import { erpsupplierlocation } from '../model/erpsupplierlocation.model';
import { erpsupplieritem } from '../model/erpsupplieritem.model';
import { boactivity } from '../../../../n-tire-bo-app/src/app/model/boactivity.model';
import { erpsupplierinvoice } from '../model/erpsupplierinvoice.model';
import { erpsuppliercertification } from '../model/erpsuppliercertification.model';
import { erpsupplierfinancialdata } from '../model/erpsupplierfinancialdata.model';
import { erpsupplierreference } from '../model/erpsupplierreference.model';
import { environment } from '../../environments/environment';
import { IerpsuppliermasterResponse } from '../model/erpsuppliermaster.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class erpsuppliermasterService {
  formData: erpsuppliermaster;
  readonly rootURL = AppConstants.baseURL;
  list: erpsuppliermaster[];
  erpsupplierlocations: erpsupplierlocation[]=[];
  erpsupplieritems: erpsupplieritem[]=[];
  boactivities: boactivity[]=[];
  erpsupplierinvoices: erpsupplierinvoice[]=[];
  erpsuppliercertifications: erpsuppliercertification[]=[];
  erpsupplierfinancialdatas: erpsupplierfinancialdata[]=[];
  erpsupplierreferences: erpsupplierreference[]=[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdateerpsuppliermasters():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
      erpsupplierlocations: this.erpsupplierlocations.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
      erpsupplieritems: this.erpsupplieritems.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
      boactivities: this.boactivities.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
      erpsupplierinvoices: this.erpsupplierinvoices.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
      erpsuppliercertifications: this.erpsuppliercertifications.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
      erpsupplierfinancialdatas: this.erpsupplierfinancialdatas.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
      erpsupplierreferences: this.erpsupplierreferences.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
    };
    return this.http.post(AppConstants.ntireprocurementURL + '/erpsuppliermaster', body);
  }
  }

  saveOrUpdateerpsuppliermastersList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntireprocurementURL + '/erpsuppliermaster', body);
  }
  }

  geterpsuppliermastersList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erpsuppliermaster').toPromise();
  }
  }
  getListBysupplierid(supplierid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erpsuppliermaster'+'/supplierid/'+supplierid).toPromise();
  }
  }

  getdefault():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erpsuppliermaster'+'/getdefault').toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erpsuppliermaster'+'/param/'+key).toPromise();
  }
  }


  geterpsuppliermastersByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erpsuppliermaster'+'/e/'+id).toPromise();
  }
  }
  geterpsuppliermastersByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erpsuppliermaster'+'/'+id).toPromise();
  }
  }

  deleteerpsuppliermaster(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntireprocurementURL + '/erpsuppliermaster'+'/'+id).toPromise();
  }
  }
clearList(){
this.erpsupplierlocations = [];
this.erpsupplieritems = [];
this.boactivities = [];
this.erpsupplierinvoices = [];
this.erpsuppliercertifications = [];
this.erpsupplierfinancialdatas = [];
this.erpsupplierreferences = [];
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntireprocurementURL + '/erpsuppliermaster')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

