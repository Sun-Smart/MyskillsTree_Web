import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { pmslease } from '../model/pmslease.model';
import { pmstransaction } from '../model/pmstransaction.model';
import { pmstransactionschedule } from '../model/pmstransactionschedule.model';
import { pmscharge } from '../model/pmscharge.model';
import { pmsdeposit } from '../model/pmsdeposit.model';
import { pmsworkorder } from '../model/pmsworkorder.model';
import { environment } from '../../environments/environment';
import { IpmsleaseResponse } from '../model/pmslease.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class pmsleaseService {
  formData: pmslease;
  readonly rootURL = AppConstants.baseURL;
  list: pmslease[];
  pmstransactions: pmstransaction[]=[];
  pmstransactionschedules: pmstransactionschedule[]=[];
  pmscharges: pmscharge[]=[];
  pmsdeposits: pmsdeposit[]=[];
  pmsworkorders: pmsworkorder[]=[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatepmsleases():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
      pmstransactions: this.pmstransactions.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
      pmstransactionschedules: this.pmstransactionschedules.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
      pmscharges: this.pmscharges.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
      pmsdeposits: this.pmsdeposits.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
      pmsworkorders: this.pmsworkorders.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
    };
    return this.http.post(AppConstants.ntirepropertyURL + '/pmslease', body);
  }
  }

  saveOrUpdatepmsleasesList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntirepropertyURL + '/pmslease', body);
  }
  }

  getpmsleasesList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirepropertyURL + '/pmslease').toPromise();
  }
  }
  getListByleaseid(leaseid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirepropertyURL + '/pmslease'+'/leaseid/'+leaseid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirepropertyURL + '/pmslease'+'/param/'+key).toPromise();
  }
  }


  getpmsleasesByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirepropertyURL + '/pmslease'+'/e/'+id).toPromise();
  }
  }
  getpmsleasesByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirepropertyURL + '/pmslease'+'/'+id).toPromise();
  }
  }

  deletepmslease(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntirepropertyURL + '/pmslease'+'/'+id).toPromise();
  }
  }
clearList(){
this.pmstransactions = [];
this.pmstransactionschedules = [];
this.pmscharges = [];
this.pmsdeposits = [];
this.pmsworkorders = [];
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntirepropertyURL + '/pmslease')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

