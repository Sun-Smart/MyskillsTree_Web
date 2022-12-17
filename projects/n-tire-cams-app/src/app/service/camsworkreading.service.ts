import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { camsworkreading } from '../model/camsworkreading.model';
import { environment } from '../../environments/environment';
import { IcamsworkreadingResponse } from '../model/camsworkreading.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class camsworkreadingService {
  formData: camsworkreading;
  readonly rootURL = AppConstants.baseURL;
  list: camsworkreading[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatecamsworkreadings():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntirecamsURL + '/camsworkreading', body);
  }
  }

  saveOrUpdatecamsworkreadingsList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntirecamsURL + '/camsworkreading', body);
  }
  }

  getcamsworkreadingsList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecamsURL + '/camsworkreading').toPromise();
  }
  }
  getListByreadingid(readingid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecamsURL + '/camsworkreading'+'/readingid/'+readingid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecamsURL + '/camsworkreading'+'/param/'+key).toPromise();
  }
  }


  getcamsworkreadingsByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecamsURL + '/camsworkreading'+'/e/'+id).toPromise();
  }
  }
  getcamsworkreadingsByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecamsURL + '/camsworkreading'+'/'+id).toPromise();
  }
  }

  deletecamsworkreading(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntirecamsURL + '/camsworkreading'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntirecamsURL + '/camsworkreading')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

