import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { hrmsemployeemovementregister } from '../model/hrmsemployeemovementregister.model';
import { environment } from '../../environments/environment';
import { IhrmsemployeemovementregisterResponse } from '../model/hrmsemployeemovementregister.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class hrmsemployeemovementregisterService {
  formData: hrmsemployeemovementregister;
  readonly rootURL = AppConstants.baseURL;
  list: hrmsemployeemovementregister[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatehrmsemployeemovementregisters():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntirehrmsURL + '/hrmsemployeemovementregister', body);
  }
  }

  saveOrUpdatehrmsemployeemovementregistersList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntirehrmsURL + '/hrmsemployeemovementregister', body);
  }
  }

  gethrmsemployeemovementregistersList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeemovementregister').toPromise();
  }
  }
  getListBymovementid(movementid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeemovementregister'+'/movementid/'+movementid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeemovementregister'+'/param/'+key).toPromise();
  }
  }


  gethrmsemployeemovementregistersByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeemovementregister'+'/e/'+id).toPromise();
  }
  }
  gethrmsemployeemovementregistersByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeemovementregister'+'/'+id).toPromise();
  }
  }

  deletehrmsemployeemovementregister(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntirehrmsURL + '/hrmsemployeemovementregister'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeemovementregister')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

