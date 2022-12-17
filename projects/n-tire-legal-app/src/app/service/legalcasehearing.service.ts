import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { legalcasehearing } from '../model/legalcasehearing.model';
import { boexpense } from '../../../../n-tire-bo-app/src/app/model/boexpense.model';
import { legalcasehearingdetailnote } from '../model/legalcasehearingdetailnote.model';
import { environment } from '../../environments/environment';
import { IlegalcasehearingResponse } from '../model/legalcasehearing.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class legalcasehearingService {
  formData: legalcasehearing;
  readonly rootURL = AppConstants.baseURL;
  list: legalcasehearing[];
  boexpenses: boexpense[]=[];
  legalcasehearingdetailnotes: legalcasehearingdetailnote[]=[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatelegalcasehearings():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
      boexpenses: this.boexpenses.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
      legalcasehearingdetailnotes: this.legalcasehearingdetailnotes.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
    };
    return this.http.post(AppConstants.ntirelegalURL + '/legalcasehearing', body);
  }
  }

  saveOrUpdatelegalcasehearingsList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntirelegalURL + '/legalcasehearing', body);
  }
  }

  getlegalcasehearingsList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirelegalURL + '/legalcasehearing').toPromise();
  }
  }
  getListByhearingid(hearingid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirelegalURL + '/legalcasehearing'+'/hearingid/'+hearingid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirelegalURL + '/legalcasehearing'+'/param/'+key).toPromise();
  }
  }


  getlegalcasehearingsByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirelegalURL + '/legalcasehearing'+'/e/'+id).toPromise();
  }
  }
  getlegalcasehearingsByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirelegalURL + '/legalcasehearing'+'/'+id).toPromise();
  }
  }

  deletelegalcasehearing(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntirelegalURL + '/legalcasehearing'+'/'+id).toPromise();
  }
  }
clearList(){
this.boexpenses = [];
this.legalcasehearingdetailnotes = [];
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntirelegalURL + '/legalcasehearing')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

