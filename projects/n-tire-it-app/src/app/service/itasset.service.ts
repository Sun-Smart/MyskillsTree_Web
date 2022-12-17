import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { itasset } from '../model/itasset.model';
import { itassetmobiledetail } from '../model/itassetmobiledetail.model';
import { itassetconfigdetail } from '../model/itassetconfigdetail.model';
import { itassetnetworkdetail } from '../model/itassetnetworkdetail.model';
import { environment } from '../../environments/environment';
import { IitassetResponse } from '../model/itasset.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class itassetService {
  formData: itasset;
  readonly rootURL = AppConstants.ntireitURL;
  itassetmobiledetails: itassetmobiledetail[]=[];
  itassetconfigdetails: itassetconfigdetail[]=[];
  itassetnetworkdetails: itassetnetworkdetail[]=[];
  list: itasset[];

  constructor(private http: HttpClient,public sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdateitassets():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
      itassetmobiledetails: this.itassetmobiledetails.filter(function(el) { return el!=undefined && Object.keys(el).length!=0; }),
      itassetconfigdetails: this.itassetconfigdetails.filter(function(el) { return el!=undefined && Object.keys(el).length!=0; }),
      itassetnetworkdetails: this.itassetnetworkdetails.filter(function(el) { return el!=undefined && Object.keys(el).length!=0; }),
    };
    return this.http.post(AppConstants.ntireitURL + '/itasset', body);
  }
  }

  saveOrUpdateitassetsList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntireitURL + '/itasset', body);
  }
  }

  getitassetsList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireitURL + '/itasset').toPromise();
  }
  }
  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireitURL + '/itasset'+'/param/'+key).toPromise();
  }
  }


  getitassetsByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireitURL + '/itasset'+'/e/'+id).toPromise();
  }
  }
  getitassetsByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireitURL + '/itasset'+'/'+id).toPromise();
  }
  }

  deleteitasset(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntireitURL + '/itasset'+'/'+id).toPromise();
  }
  }
clearList(){
this.itassetmobiledetails = [];
this.itassetconfigdetails = [];
this.itassetnetworkdetails = [];
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntireitURL + '/itasset')
.toPromise()
.then((res:any) => this.list = res as any[]);
}
}


}

