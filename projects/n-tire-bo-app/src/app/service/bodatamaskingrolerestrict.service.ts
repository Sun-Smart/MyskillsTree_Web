import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { bodatamaskingrolerestrict } from '../model/bodatamaskingrolerestrict.model';
import { environment } from '../../environments/environment';
import { IbodatamaskingrolerestrictResponse } from '../model/bodatamaskingrolerestrict.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../shared/helper'
import { SessionService } from '../pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class bodatamaskingrolerestrictService {
  formData: bodatamaskingrolerestrict;
  readonly rootURL = AppConstants.baseURL;
  list: bodatamaskingrolerestrict[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatebodatamaskingrolerestricts():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntireboURL + '/bodatamaskingrolerestrict', body);
  }
  }

  saveOrUpdatebodatamaskingrolerestrictsList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntireboURL + '/bodatamaskingrolerestrict', body);
  }
  }

  getbodatamaskingrolerestrictsList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/bodatamaskingrolerestrict').toPromise();
  }
  }
  getListByrestrictid(restrictid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/bodatamaskingrolerestrict'+'/restrictid/'+restrictid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/bodatamaskingrolerestrict'+'/param/'+key).toPromise();
  }
  }


  getbodatamaskingrolerestrictsByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/bodatamaskingrolerestrict'+'/e/'+id).toPromise();
  }
  }
  getbodatamaskingrolerestrictsByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/bodatamaskingrolerestrict'+'/'+id).toPromise();
  }
  }

  deletebodatamaskingrolerestrict(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntireboURL + '/bodatamaskingrolerestrict'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntireboURL + '/bodatamaskingrolerestrict')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

