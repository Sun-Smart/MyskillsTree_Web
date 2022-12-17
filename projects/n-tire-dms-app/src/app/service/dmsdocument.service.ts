import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { dmsdocument } from '../model/dmsdocument.model';
import { bodocumentcontrol } from '../../../../n-tire-bo-app/src/app/model/bodocumentcontrol.model';
import { dmssubscription } from '../model/dmssubscription.model';
import { dmsarchiverestorerequest } from '../model/dmsarchiverestorerequest.model';
import { dmsaudittrail } from '../model/dmsaudittrail.model';
import { dmsdocumentfield } from '../model/dmsdocumentfield.model';
import { dmslinkeddocument } from '../model/dmslinkeddocument.model';
import { dmslink } from '../model/dmslink.model';
import { environment } from '../../environments/environment';
import { IdmsdocumentResponse } from '../model/dmsdocument.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class dmsdocumentService {
  formData: dmsdocument;
  readonly rootURL = AppConstants.baseURL;
  list: dmsdocument[];
  bodocumentcontrols: bodocumentcontrol[]=[];
  dmssubscriptions: dmssubscription[]=[];
  dmsarchiverestorerequests: dmsarchiverestorerequest[]=[];
  dmsaudittrails: dmsaudittrail[]=[];
  dmsdocumentfields: dmsdocumentfield[]=[];
  dmslinkeddocuments: dmslinkeddocument[]=[];
  dmslinks: dmslink[]=[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatedmsdocuments():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
      bodocumentcontrols: this.bodocumentcontrols.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
      dmssubscriptions: this.dmssubscriptions.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
      dmsarchiverestorerequests: this.dmsarchiverestorerequests.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
      dmsaudittrails: this.dmsaudittrails.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
      dmsdocumentfields: this.dmsdocumentfields.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
      dmslinkeddocuments: this.dmslinkeddocuments.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
      dmslinks: this.dmslinks.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
    };
    return this.http.post(AppConstants.ntiredmsURL + '/dmsdocument', body);
  }
  }

  saveOrUpdatedmsdocumentsList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntiredmsURL + '/dmsdocument', body);
  }
  }

  getdmsdocumentsList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntiredmsURL + '/dmsdocument').toPromise();
  }
  }
  getListBydocumentid(documentid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntiredmsURL + '/dmsdocument'+'/documentid/'+documentid).toPromise();
  }
  }

  getListBysourcereference(sourcereference:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntiredmsURL + '/dmsdocument'+'/sourcereference/'+sourcereference).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntiredmsURL + '/dmsdocument'+'/param/'+key).toPromise();
  }
  }


  getdmsdocumentsByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntiredmsURL + '/dmsdocument'+'/e/'+id).toPromise();
  }
  }
  getdmsdocumentsByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntiredmsURL + '/dmsdocument'+'/'+id).toPromise();
  }
  }

  deletedmsdocument(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntiredmsURL + '/dmsdocument'+'/'+id).toPromise();
  }
  }
clearList(){
this.bodocumentcontrols = [];
this.dmssubscriptions = [];
this.dmsarchiverestorerequests = [];
this.dmsaudittrails = [];
this.dmsdocumentfields = [];
this.dmslinkeddocuments = [];
this.dmslinks = [];
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntiredmsURL + '/dmsdocument')
.toPromise()
.then(res => this.list = res as any[]);
}
}
  getdmsdocumentsListbytype(dt:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntiredmsURL + '/dmsdocument/'+dt+'').toPromise();
  }
  }

  getdmsdocumentsListbymonthwise(dt:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntiredmsURL + '/dmsdocument/'+dt+'').toPromise();
  }
  }



}

