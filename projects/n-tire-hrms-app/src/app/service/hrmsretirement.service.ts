import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { hrmsretirement } from '../model/hrmsretirement.model';
import { environment } from '../../environments/environment';
import { IhrmsretirementResponse } from '../model/hrmsretirement.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class hrmsretirementService {
  formData: hrmsretirement;
  readonly rootURL = AppConstants.baseURL;
  list: hrmsretirement[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatehrmsretirements():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntirehrmsURL + '/hrmsretirement', body);
  }
  }

  saveOrUpdatehrmsretirementsList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntirehrmsURL + '/hrmsretirement', body);
  }
  }

  gethrmsretirementsList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsretirement').toPromise();
  }
  }
  getListByretirementid(retirementid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsretirement'+'/retirementid/'+retirementid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsretirement'+'/param/'+key).toPromise();
  }
  }


  gethrmsretirementsByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsretirement'+'/e/'+id).toPromise();
  }
  }
  gethrmsretirementsByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsretirement'+'/'+id).toPromise();
  }
  }

  deletehrmsretirement(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntirehrmsURL + '/hrmsretirement'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntirehrmsURL + '/hrmsretirement')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

