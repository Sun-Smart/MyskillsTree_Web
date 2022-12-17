import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { prjprojectchange } from '../model/prjprojectchange.model';
import { environment } from '../../environments/environment';
import { IprjprojectchangeResponse } from '../model/prjprojectchange.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class prjprojectchangeService {
  formData: prjprojectchange;
  readonly rootURL = AppConstants.baseURL;
  list: prjprojectchange[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdateprjprojectchanges():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntireprojectURL + '/prjprojectchange', body);
  }
  }

  saveOrUpdateprjprojectchangesList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntireprojectURL + '/prjprojectchange', body);
  }
  }

  getprjprojectchangesList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprojectURL + '/prjprojectchange').toPromise();
  }
  }
  getListBychangeid(changeid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprojectURL + '/prjprojectchange'+'/changeid/'+changeid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprojectURL + '/prjprojectchange'+'/param/'+key).toPromise();
  }
  }


  getprjprojectchangesByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprojectURL + '/prjprojectchange'+'/e/'+id).toPromise();
  }
  }
  getprjprojectchangesByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprojectURL + '/prjprojectchange'+'/'+id).toPromise();
  }
  }

  deleteprjprojectchange(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntireprojectURL + '/prjprojectchange'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntireprojectURL + '/prjprojectchange')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

