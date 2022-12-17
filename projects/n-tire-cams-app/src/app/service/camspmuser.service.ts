import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { camspmuser } from '../model/camspmuser.model';
import { environment } from '../../environments/environment';
import { IcamspmuserResponse } from '../model/camspmuser.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class camspmuserService {
  formData: camspmuser;
  readonly rootURL = AppConstants.baseURL;
  list: camspmuser[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatecamspmusers():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntirecamsURL + '/camspmuser', body);
  }
  }

  saveOrUpdatecamspmusersList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntirecamsURL + '/camspmuser', body);
  }
  }

  getcamspmusersList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecamsURL + '/camspmuser').toPromise();
  }
  }
  getListBypmuserid(pmuserid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecamsURL + '/camspmuser'+'/pmuserid/'+pmuserid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecamsURL + '/camspmuser'+'/param/'+key).toPromise();
  }
  }


  getcamspmusersByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecamsURL + '/camspmuser'+'/e/'+id).toPromise();
  }
  }
  getcamspmusersByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecamsURL + '/camspmuser'+'/'+id).toPromise();
  }
  }

  deletecamspmuser(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntirecamsURL + '/camspmuser'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntirecamsURL + '/camspmuser')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

