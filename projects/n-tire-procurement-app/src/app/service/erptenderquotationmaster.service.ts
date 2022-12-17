import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { erptenderquotationmaster } from '../model/erptenderquotationmaster.model';
import { erptenderquotationanswer } from '../model/erptenderquotationanswer.model';
import { erptenderquotationdetail } from '../model/erptenderquotationdetail.model';
import { environment } from '../../environments/environment';
import { IerptenderquotationmasterResponse } from '../model/erptenderquotationmaster.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class erptenderquotationmasterService {
  formData: erptenderquotationmaster;
  readonly rootURL = AppConstants.baseURL;
  list: erptenderquotationmaster[];
  erptenderquotationanswers: erptenderquotationanswer[]=[];
  erptenderquotationdetails: erptenderquotationdetail[]=[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdateerptenderquotationmasters():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
      erptenderquotationanswers: this.erptenderquotationanswers.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
      erptenderquotationdetails: this.erptenderquotationdetails.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
    };
    return this.http.post(AppConstants.ntireprocurementURL + '/erptenderquotationmaster', body);
  }
  }

  saveOrUpdateerptenderquotationmastersList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntireprocurementURL + '/erptenderquotationmaster', body);
  }
  }

  geterptenderquotationmastersList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erptenderquotationmaster').toPromise();
  }
  }
  getListByquotationid(quotationid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erptenderquotationmaster'+'/quotationid/'+quotationid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erptenderquotationmaster'+'/param/'+key).toPromise();
  }
  }


  geterptenderquotationmastersByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erptenderquotationmaster'+'/e/'+id).toPromise();
  }
  }
  geterptenderquotationmastersByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erptenderquotationmaster'+'/'+id).toPromise();
  }
  }

  deleteerptenderquotationmaster(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntireprocurementURL + '/erptenderquotationmaster'+'/'+id).toPromise();
  }
  }
clearList(){
this.erptenderquotationanswers = [];
this.erptenderquotationdetails = [];
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntireprocurementURL + '/erptenderquotationmaster')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

