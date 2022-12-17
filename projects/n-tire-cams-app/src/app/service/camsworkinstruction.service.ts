import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { camsworkinstruction } from '../model/camsworkinstruction.model';
import { environment } from '../../environments/environment';
import { IcamsworkinstructionResponse } from '../model/camsworkinstruction.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class camsworkinstructionService {
  formData: camsworkinstruction;
  readonly rootURL = AppConstants.baseURL;
  list: camsworkinstruction[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatecamsworkinstructions():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntirecamsURL + '/camsworkinstruction', body);
  }
  }

  saveOrUpdatecamsworkinstructionsList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntirecamsURL + '/camsworkinstruction', body);
  }
  }

  getcamsworkinstructionsList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecamsURL + '/camsworkinstruction').toPromise();
  }
  }
  getListByworkinstructionid(workinstructionid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecamsURL + '/camsworkinstruction'+'/workinstructionid/'+workinstructionid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecamsURL + '/camsworkinstruction'+'/param/'+key).toPromise();
  }
  }


  getcamsworkinstructionsByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecamsURL + '/camsworkinstruction'+'/e/'+id).toPromise();
  }
  }
  getcamsworkinstructionsByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecamsURL + '/camsworkinstruction'+'/'+id).toPromise();
  }
  }

  deletecamsworkinstruction(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntirecamsURL + '/camsworkinstruction'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntirecamsURL + '/camsworkinstruction')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

