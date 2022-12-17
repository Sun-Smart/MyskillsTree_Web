import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ltylist } from '../model/ltylist.model';
import { ltycustomerlist } from '../model/ltycustomerlist.model';
import { environment } from '../../environments/environment';
import { IltylistResponse } from '../model/ltylist.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class ltylistService {
  formData: ltylist;
  readonly rootURL = AppConstants.baseURL;
  list: ltylist[];
  ltycustomerlists: ltycustomerlist[]=[];
  Insertltycustomerlists: ltycustomerlist[]=[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdateltylists():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
      ltycustomerlists: this.Insertltycustomerlists.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
    };
    return this.http.post(AppConstants.ntireloyaltyURL + '/ltylist', body);
  }
  }

  saveOrUpdateltylistsList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntireloyaltyURL + '/ltylist', body);
  }
  }

  getltylistsList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireloyaltyURL + '/ltylist').toPromise();
  }
  }
  getListBylistid(listid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireloyaltyURL + '/ltylist'+'/listid/'+listid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireloyaltyURL + '/ltylist'+'/param/'+key).toPromise();
  }
  }


  getltylistsByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireloyaltyURL + '/ltylist'+'/e/'+id).toPromise();
  }
  }
  getltylistsByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireloyaltyURL + '/ltylist'+'/'+id).toPromise();
  }
  }

  deleteltylist(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntireloyaltyURL + '/ltylist'+'/'+id).toPromise();
  }
  }
clearList(){
this.ltycustomerlists = [];
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntireloyaltyURL + '/ltylist')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

