import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ltyreward } from '../model/ltyreward.model';
import { ltycustomerreward } from '../model/ltycustomerreward.model';
import { environment } from '../../environments/environment';
import { IltyrewardResponse } from '../model/ltyreward.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class ltyrewardService {
  formData: ltyreward;
  readonly rootURL = AppConstants.ntireloyaltyURL;
  ltycustomerrewards: ltycustomerreward[]=[];
  list: ltyreward[];

  constructor(private http: HttpClient,public sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdateltyrewards():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
      ltycustomerrewards: this.ltycustomerrewards.filter(function(el) { return el!=undefined && Object.keys(el).length!=0; }),
    };
    return this.http.post(this.rootURL + '/ltyreward', body);
  }
  }

  saveOrUpdateltyrewardsList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(this.rootURL + '/ltyreward', body);
  }
  }

  getltyrewardsList():any {
  if (this.valid()){ 
    return this.http.get(this.rootURL + '/ltyreward').toPromise();
  }
  }
  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(this.rootURL + '/ltyreward'+'/param/'+key).toPromise();
  }
  }


  getltyrewardsByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(this.rootURL + '/ltyreward'+'/e/'+id).toPromise();
  }
  }
  getltyrewardsByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(this.rootURL + '/ltyreward'+'/'+id).toPromise();
  }
  }

  deleteltyreward(id:number):any {
  if (this.valid()){ 
    return this.http.delete(this.rootURL + '/ltyreward'+'/'+id).toPromise();
  }
  }
clearList(){
this.ltycustomerrewards = [];
}
refreshList():any{
  if (this.valid()){ 
this.http.get(this.rootURL + '/ltyreward')
.toPromise()
.then((res:any) => this.list = res as any[]);
}
}


}

