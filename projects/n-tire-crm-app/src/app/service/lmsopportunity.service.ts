import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lmsopportunity } from '../model/lmsopportunity.model';
import { lmsopportunityproduct } from '../model/lmsopportunityproduct.model';
import { lmscall } from '../model/lmscall.model';
import { lmssecondarycontact } from '../model/lmssecondarycontact.model';
import { lmsreminder } from '../model/lmsreminder.model';
import { lmsquote } from '../model/lmsquote.model';
import { boexpense } from '../../../../n-tire-bo-app/src/app/model/boexpense.model';
import { environment } from '../../environments/environment';
import { IlmsopportunityResponse } from '../model/lmsopportunity.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class lmsopportunityService {
  formData: lmsopportunity;
  readonly rootURL = AppConstants.baseURL;
  list: lmsopportunity[];
  lmsopportunityproducts: lmsopportunityproduct[]=[];
  lmscalls: lmscall[]=[];
  lmssecondarycontacts: lmssecondarycontact[]=[];
  lmsreminders: lmsreminder[]=[];
  lmsquotes: lmsquote[]=[];
  boexpenses: boexpense[]=[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatelmsopportunities():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
      lmsopportunityproducts: this.lmsopportunityproducts.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
      lmscalls: this.lmscalls.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
      lmssecondarycontacts: this.lmssecondarycontacts.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
      lmsreminders: this.lmsreminders.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
      lmsquotes: this.lmsquotes.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
      boexpenses: this.boexpenses.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
    };
    return this.http.post(AppConstants.ntirecrmURL + '/lmsopportunity', body);
  }
  }

  saveOrUpdatelmsopportunitiesList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntirecrmURL + '/lmsopportunity', body);
  }
  }

  getlmsopportunitiesList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecrmURL + '/lmsopportunity').toPromise();
  }
  }
  getListByopportunityid(opportunityid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecrmURL + '/lmsopportunity'+'/opportunityid/'+opportunityid).toPromise();
  }
  }

  getListByopportunitystage(opportunitystage:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecrmURL + '/lmsopportunity'+'/opportunitystage/'+opportunitystage).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecrmURL + '/lmsopportunity'+'/param/'+key).toPromise();
  }
  }


  getlmsopportunitiesByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecrmURL + '/lmsopportunity'+'/e/'+id).toPromise();
  }
  }
  getlmsopportunitiesByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecrmURL + '/lmsopportunity'+'/'+id).toPromise();
  }
  }

  deletelmsopportunity(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntirecrmURL + '/lmsopportunity'+'/'+id).toPromise();
  }
  }
clearList(){
this.lmsopportunityproducts = [];
this.lmscalls = [];
this.lmssecondarycontacts = [];
this.lmsreminders = [];
this.lmsquotes = [];
this.boexpenses = [];
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntirecrmURL + '/lmsopportunity')
.toPromise()
.then(res => this.list = res as any[]);
}
}
  getlmsopportunitiesListbyopportunitystage(dt:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecrmURL + '/lmsopportunity/'+dt+'').toPromise();
  }
  }

  getlmsopportunitiesListbymonthwise(dt:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecrmURL + '/lmsopportunity/'+dt+'').toPromise();
  }
  }



}

