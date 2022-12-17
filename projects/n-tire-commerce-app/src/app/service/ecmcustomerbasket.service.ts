import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ecmcustomerbasket } from '../model/ecmcustomerbasket.model';
import { ecmcustomerbasketattribute } from '../model/ecmcustomerbasketattribute.model';
import { environment } from '../../environments/environment';
import { IecmcustomerbasketResponse } from '../model/ecmcustomerbasket.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class ecmcustomerbasketService {
  formData: ecmcustomerbasket;
  readonly rootURL = AppConstants.baseURL;
  ecmcustomerbasketattributes: ecmcustomerbasketattribute[]=[];
  list: ecmcustomerbasket[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdateecmcustomerbaskets():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
      ecmcustomerbasketattributes: this.ecmcustomerbasketattributes.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
    };
    return this.http.post(AppConstants.ntirecommerceURL + '/ecmcustomerbasket', body);
  }
  }

  saveOrUpdateecmcustomerbasketsList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntirecommerceURL + '/ecmcustomerbasket', body);
  }
  }

  getecmcustomerbasketsList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecommerceURL + '/ecmcustomerbasket').toPromise();
  }
  }
  getListBycustomersbasketid(customersbasketid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecommerceURL + '/ecmcustomerbasket'+'/customersbasketid/'+customersbasketid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecommerceURL + '/ecmcustomerbasket'+'/param/'+key).toPromise();
  }
  }


  getecmcustomerbasketsByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecommerceURL + '/ecmcustomerbasket'+'/e/'+id).toPromise();
  }
  }
  getecmcustomerbasketsByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecommerceURL + '/ecmcustomerbasket'+'/'+id).toPromise();
  }
  }

  deleteecmcustomerbasket(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntirecommerceURL + '/ecmcustomerbasket'+'/'+id).toPromise();
  }
  }
clearList(){
this.ecmcustomerbasketattributes = [];
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntirecommerceURL + '/ecmcustomerbasket')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

