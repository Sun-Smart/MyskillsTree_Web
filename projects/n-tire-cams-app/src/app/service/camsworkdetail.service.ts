import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { camsworkdetail } from '../model/camsworkdetail.model';
import { camsworktimelog } from '../model/camsworktimelog.model';
import { camsworkinstruction } from '../model/camsworkinstruction.model';
import { camsworkitem } from '../model/camsworkitem.model';
import { environment } from '../../environments/environment';
import { IcamsworkdetailResponse } from '../model/camsworkdetail.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class camsworkdetailService {
  formData: camsworkdetail;
  readonly rootURL = AppConstants.baseURL;
  list: camsworkdetail[];
  camsworktimelogs: camsworktimelog[]=[];
  camsworkinstructions: camsworkinstruction[]=[];
  camsworkitems: camsworkitem[]=[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatecamsworkdetails():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
      camsworktimelogs: this.camsworktimelogs.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
      camsworkinstructions: this.camsworkinstructions.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
      camsworkitems: this.camsworkitems.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
    };
    return this.http.post(AppConstants.ntirecamsURL + '/camsworkdetail', body);
  }
  }

  saveOrUpdatecamsworkdetailsList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntirecamsURL + '/camsworkdetail', body);
  }
  }

  getcamsworkdetailsList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecamsURL + '/camsworkdetail').toPromise();
  }
  }
  getListByworkorderdetailid(workorderdetailid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecamsURL + '/camsworkdetail'+'/workorderdetailid/'+workorderdetailid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecamsURL + '/camsworkdetail'+'/param/'+key).toPromise();
  }
  }


  getcamsworkdetailsByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecamsURL + '/camsworkdetail'+'/e/'+id).toPromise();
  }
  }
  getcamsworkdetailsByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecamsURL + '/camsworkdetail'+'/'+id).toPromise();
  }
  }

  deletecamsworkdetail(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntirecamsURL + '/camsworkdetail'+'/'+id).toPromise();
  }
  }
clearList(){
this.camsworktimelogs = [];
this.camsworkinstructions = [];
this.camsworkitems = [];
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntirecamsURL + '/camsworkdetail')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

