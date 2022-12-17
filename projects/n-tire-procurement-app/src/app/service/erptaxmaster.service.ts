import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { erptaxmaster } from '../model/erptaxmaster.model';
import { erptaxcalculation } from '../model/erptaxcalculation.model';
import { environment } from '../../environments/environment';
import { IerptaxmasterResponse } from '../model/erptaxmaster.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class erptaxmasterService {
  formData: erptaxmaster;
  readonly rootURL = AppConstants.baseURL;
  list: erptaxmaster[];
  erptaxcalculations: erptaxcalculation[]=[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdateerptaxmasters():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
      erptaxcalculations: this.erptaxcalculations.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
    };
    return this.http.post(AppConstants.ntireprocurementURL + '/erptaxmaster', body);
  }
  }

  saveOrUpdateerptaxmastersList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntireprocurementURL + '/erptaxmaster', body);
  }
  }

  geterptaxmastersList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erptaxmaster').toPromise();
  }
  }
  getListBytaxid(taxid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erptaxmaster'+'/taxid/'+taxid).toPromise();
  }
  }

  getListByitemcategoryid(itemcategoryid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erptaxmaster'+'/itemcategoryid/'+itemcategoryid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erptaxmaster'+'/param/'+key).toPromise();
  }
  }


  geterptaxmastersByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erptaxmaster'+'/e/'+id).toPromise();
  }
  }
  geterptaxmastersByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erptaxmaster'+'/'+id).toPromise();
  }
  }

  deleteerptaxmaster(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntireprocurementURL + '/erptaxmaster'+'/'+id).toPromise();
  }
  }
clearList(){
this.erptaxcalculations = [];
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntireprocurementURL + '/erptaxmaster')
.toPromise()
.then(res => this.list = res as any[]);
}
}
search(filter: {name: string} = {name: ''}, page = 1): Observable<IerptaxmasterResponse> {
return this.http.get<IerptaxmasterResponse>(AppConstants.ntireprocurementURL+'/erptaxmaster')
.pipe(
tap((response: IerptaxmasterResponse) => {
console.log(response);
//debugger;
var response1;
response1=response;
response.results = response1.map(erptaxmaster => new erptaxmaster(erptaxmaster.taxid,erptaxmaster.taxiddesc,erptaxmaster.taxcode,erptaxmaster.taxname,erptaxmaster.tags,erptaxmaster.taxtype,erptaxmaster.taxtypedesc,erptaxmaster.taxpercentage,erptaxmaster.accountgroup,erptaxmaster.accountgroupdesc,erptaxmaster.description,erptaxmaster.openingbalancetype,erptaxmaster.openingbalancetypedesc,erptaxmaster.openingbalance,erptaxmaster.formrequired,erptaxmaster.itemcategoryid,erptaxmaster.itemcategoryiddesc,erptaxmaster.customfield,erptaxmaster.attachment,erptaxmaster.comments,erptaxmaster.status,""))
// Not filtering in the server since in-memory-web-api has somewhat restricted api
.filter(erptaxmaster => erptaxmaster.taxname.includes(filter.name))

return response;
})
);
}



}

