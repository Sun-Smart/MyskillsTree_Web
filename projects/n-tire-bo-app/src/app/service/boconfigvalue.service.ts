import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { boconfigvalue } from '../model/boconfigvalue.model';
import { bosubconfigvalue } from '../../../../n-tire-biz-app/src/app/model/bosubconfigvalue.model';
import { environment } from '../../environments/environment';
import { IboconfigvalueResponse } from '../model/boconfigvalue.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../shared/helper'
import { SessionService } from '../pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class boconfigvalueService {
  formData: boconfigvalue;
  readonly rootURL = AppConstants.baseURL;
  list: boconfigvalue[];
  bosubconfigvalues: bosubconfigvalue[]=[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdateboconfigvalues():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
      bosubconfigvalues: this.bosubconfigvalues.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
    };
    return this.http.post(AppConstants.ntireboURL + '/boconfigvalue', body);
  }
  }

  saveOrUpdateboconfigvaluesList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntireboURL + '/boconfigvalue', body);
  }
  }

  getboconfigvaluesList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/boconfigvalue').toPromise();
  }
  }
  getListByconfigid(configid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/boconfigvalue'+'/configid/'+configid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/boconfigvalue'+'/param/'+key).toPromise();
  }
  }


  getboconfigvaluesByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/boconfigvalue'+'/e/'+id).toPromise();
  }
  }
  getboconfigvaluesByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/boconfigvalue'+'/'+id).toPromise();
  }
  }

  deleteboconfigvalue(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntireboURL + '/boconfigvalue'+'/'+id).toPromise();
  }
  }
clearList(){
this.bosubconfigvalues = [];
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntireboURL + '/boconfigvalue')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

