import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { hrmsemployeedependent } from '../model/hrmsemployeedependent.model';
import { environment } from '../../environments/environment';
import { IhrmsemployeedependentResponse } from '../model/hrmsemployeedependent.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class hrmsemployeedependentService {
  formData: hrmsemployeedependent;
  readonly rootURL = AppConstants.baseURL;
  list: hrmsemployeedependent[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatehrmsemployeedependents():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntirehrmsURL + '/hrmsemployeedependent', body);
  }
  }

  saveOrUpdatehrmsemployeedependentsList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntirehrmsURL + '/hrmsemployeedependent', body);
  }
  }

  gethrmsemployeedependentsList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeedependent').toPromise();
  }
  }
  getListBydependentid(dependentid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeedependent'+'/dependentid/'+dependentid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeedependent'+'/param/'+key).toPromise();
  }
  }


  gethrmsemployeedependentsByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeedependent'+'/e/'+id).toPromise();
  }
  }
  gethrmsemployeedependentsByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeedependent'+'/'+id).toPromise();
  }
  }

  deletehrmsemployeedependent(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntirehrmsURL + '/hrmsemployeedependent'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeedependent')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

