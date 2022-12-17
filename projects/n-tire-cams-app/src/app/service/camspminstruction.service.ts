import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { camspminstruction } from '../model/camspminstruction.model';
import { environment } from '../../environments/environment';
import { IcamspminstructionResponse } from '../model/camspminstruction.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class camspminstructionService {
  formData: camspminstruction;
  readonly rootURL = AppConstants.baseURL;
  list: camspminstruction[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatecamspminstructions():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntirecamsURL + '/camspminstruction', body);
  }
  }

  saveOrUpdatecamspminstructionsList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntirecamsURL + '/camspminstruction', body);
  }
  }

  getcamspminstructionsList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecamsURL + '/camspminstruction').toPromise();
  }
  }
  getListBypminstructionid(pminstructionid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecamsURL + '/camspminstruction'+'/pminstructionid/'+pminstructionid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecamsURL + '/camspminstruction'+'/param/'+key).toPromise();
  }
  }


  getcamspminstructionsByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecamsURL + '/camspminstruction'+'/e/'+id).toPromise();
  }
  }
  getcamspminstructionsByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecamsURL + '/camspminstruction'+'/'+id).toPromise();
  }
  }

  deletecamspminstruction(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntirecamsURL + '/camspminstruction'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntirecamsURL + '/camspminstruction')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

