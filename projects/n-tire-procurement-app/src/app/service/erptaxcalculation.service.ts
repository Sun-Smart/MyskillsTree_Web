import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { erptaxcalculation } from '../model/erptaxcalculation.model';
import { environment } from '../../environments/environment';
import { IerptaxcalculationResponse } from '../model/erptaxcalculation.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class erptaxcalculationService {
  formData: erptaxcalculation;
  readonly rootURL = AppConstants.baseURL;
  list: erptaxcalculation[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdateerptaxcalculations():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntireprocurementURL + '/erptaxcalculation', body);
  }
  }

  saveOrUpdateerptaxcalculationsList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntireprocurementURL + '/erptaxcalculation', body);
  }
  }

  geterptaxcalculationsList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erptaxcalculation').toPromise();
  }
  }
  getListBycalculationid(calculationid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erptaxcalculation'+'/calculationid/'+calculationid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erptaxcalculation'+'/param/'+key).toPromise();
  }
  }


  geterptaxcalculationsByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erptaxcalculation'+'/e/'+id).toPromise();
  }
  }
  geterptaxcalculationsByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erptaxcalculation'+'/'+id).toPromise();
  }
  }

  deleteerptaxcalculation(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntireprocurementURL + '/erptaxcalculation'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntireprocurementURL + '/erptaxcalculation')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

