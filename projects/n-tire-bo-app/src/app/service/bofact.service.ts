import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { bofact } from '../model/bofact.model';
import { bonotifier } from '../model/bonotifier.model';
import { environment } from '../../environments/environment';
import { IbofactResponse } from '../model/bofact.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../shared/helper'
import { SessionService } from '../pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class bofactService {
  formData: bofact;
  readonly rootURL = AppConstants.baseURL;
  list: bofact[];
  bonotifiers: bonotifier[]=[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatebofacts():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
      bonotifiers: this.bonotifiers.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
    };
    return this.http.post(AppConstants.ntireboURL + '/bofact', body);
  }
  }

  saveOrUpdatebofactsList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntireboURL + '/bofact', body);
  }
  }

  getbofactsList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/bofact').toPromise();
  }
  }
  getListByfactid(factid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/bofact'+'/factid/'+factid).toPromise();
  }
  }

  getListBysourcereference(sourcereference:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/bofact'+'/sourcereference/'+sourcereference).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/bofact'+'/param/'+key).toPromise();
  }
  }


  getbofactsByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/bofact'+'/e/'+id).toPromise();
  }
  }
  getbofactsByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/bofact'+'/'+id).toPromise();
  }
  }

  deletebofact(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntireboURL + '/bofact'+'/'+id).toPromise();
  }
  }
clearList(){
this.bonotifiers = [];
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntireboURL + '/bofact')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

