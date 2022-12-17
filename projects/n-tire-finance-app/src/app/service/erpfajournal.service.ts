import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { erpfajournal } from '../model/erpfajournal.model';
import { erpfajournaldetail } from '../model/erpfajournaldetail.model';
import { erpfajournalcostcenter } from '../model/erpfajournalcostcenter.model';
import { environment } from '../../environments/environment';
import { IerpfajournalResponse } from '../model/erpfajournal.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class erpfajournalService {
  formData: erpfajournal;
  readonly rootURL = AppConstants.ntirefinanceURL;
  erpfajournaldetails: erpfajournaldetail[]=[];
  erpfajournalcostcenters: erpfajournalcostcenter[]=[];
  list: erpfajournal[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdateerpfajournals():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
      erpfajournaldetails: this.erpfajournaldetails.filter(function(el) { return el!=undefined && Object.keys(el).length!=0; }),
      erpfajournalcostcenters: this.erpfajournalcostcenters.filter(function(el) { return el!=undefined && Object.keys(el).length!=0; }),
    };
    return this.http.post(AppConstants.ntirefinanceURL + '/erpfajournal', body);
  }
  }

  saveOrUpdateerpfajournalsList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntirefinanceURL + '/erpfajournal', body);
  }
  }

  geterpfajournalsList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirefinanceURL + '/erpfajournal').toPromise();
  }
  }
  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirefinanceURL + '/erpfajournal'+'/param/'+key).toPromise();
  }
  }


  geterpfajournalsByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirefinanceURL + '/erpfajournal'+'/e/'+id).toPromise();
  }
  }
  geterpfajournalsByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirefinanceURL + '/erpfajournal'+'/'+id).toPromise();
  }
  }

  deleteerpfajournal(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntirefinanceURL + '/erpfajournal'+'/'+id).toPromise();
  }
  }
clearList(){
this.erpfajournaldetails = [];
this.erpfajournalcostcenters = [];
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntirefinanceURL + '/erpfajournal')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

