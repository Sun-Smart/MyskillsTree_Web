import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { camsworkitem } from '../model/camsworkitem.model';
import { environment } from '../../environments/environment';
import { IcamsworkitemResponse } from '../model/camsworkitem.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class camsworkitemService {
  formData: camsworkitem;
  readonly rootURL = AppConstants.baseURL;
  list: camsworkitem[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatecamsworkitems():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntirecamsURL + '/camsworkitem', body);
  }
  }

  saveOrUpdatecamsworkitemsList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntirecamsURL + '/camsworkitem', body);
  }
  }

  getcamsworkitemsList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecamsURL + '/camsworkitem').toPromise();
  }
  }
  getListByworkorderitemid(workorderitemid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecamsURL + '/camsworkitem'+'/workorderitemid/'+workorderitemid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecamsURL + '/camsworkitem'+'/param/'+key).toPromise();
  }
  }


  getcamsworkitemsByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecamsURL + '/camsworkitem'+'/e/'+id).toPromise();
  }
  }
  getcamsworkitemsByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecamsURL + '/camsworkitem'+'/'+id).toPromise();
  }
  }

  deletecamsworkitem(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntirecamsURL + '/camsworkitem'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntirecamsURL + '/camsworkitem')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

