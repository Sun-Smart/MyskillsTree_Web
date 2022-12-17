import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { camspmmaster } from '../model/camspmmaster.model';
import { camspmtask } from '../model/camspmtask.model';
import { camspminstruction } from '../model/camspminstruction.model';
import { camspmitem } from '../model/camspmitem.model';
import { camspmsuppliertask } from '../model/camspmsuppliertask.model';
import { camspmuser } from '../model/camspmuser.model';
import { environment } from '../../environments/environment';
import { IcamspmmasterResponse } from '../model/camspmmaster.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class camspmmasterService {
  formData: camspmmaster;
  readonly rootURL = AppConstants.baseURL;
  list: camspmmaster[];
  camspmtasks: camspmtask[]=[];
  camspminstructions: camspminstruction[]=[];
  camspmitems: camspmitem[]=[];
  camspmsuppliertasks: camspmsuppliertask[]=[];
  camspmusers: camspmuser[]=[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatecamspmmasters():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
      camspmtasks: this.camspmtasks.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
      camspminstructions: this.camspminstructions.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
      camspmitems: this.camspmitems.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
      camspmsuppliertasks: this.camspmsuppliertasks.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
      camspmusers: this.camspmusers.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
    };
    return this.http.post(AppConstants.ntirecamsURL + '/camspmmaster', body);
  }
  }

  saveOrUpdatecamspmmastersList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntirecamsURL + '/camspmmaster', body);
  }
  }

  getcamspmmastersList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecamsURL + '/camspmmaster').toPromise();
  }
  }
  getListBypmid(pmid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecamsURL + '/camspmmaster'+'/pmid/'+pmid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecamsURL + '/camspmmaster'+'/param/'+key).toPromise();
  }
  }


  getcamspmmastersByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecamsURL + '/camspmmaster'+'/e/'+id).toPromise();
  }
  }
  getcamspmmastersByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecamsURL + '/camspmmaster'+'/'+id).toPromise();
  }
  }

  deletecamspmmaster(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntirecamsURL + '/camspmmaster'+'/'+id).toPromise();
  }
  }
clearList(){
this.camspmtasks = [];
this.camspminstructions = [];
this.camspmitems = [];
this.camspmsuppliertasks = [];
this.camspmusers = [];
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntirecamsURL + '/camspmmaster')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

