import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { hrmsmprapplicant } from '../model/hrmsmprapplicant.model';
import { environment } from '../../environments/environment';
import { IhrmsmprapplicantResponse } from '../model/hrmsmprapplicant.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class hrmsmprapplicantService {
  formData: hrmsmprapplicant;
  readonly rootURL = AppConstants.baseURL;
  list: hrmsmprapplicant[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatehrmsmprapplicants():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntirehrmsURL + '/hrmsmprapplicant', body);
  }
  }

  saveOrUpdatehrmsmprapplicantsList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntirehrmsURL + '/hrmsmprapplicant', body);
  }
  }

  gethrmsmprapplicantsList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsmprapplicant').toPromise();
  }
  }
  getListBymprapplicantid(mprapplicantid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsmprapplicant'+'/mprapplicantid/'+mprapplicantid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsmprapplicant'+'/param/'+key).toPromise();
  }
  }


  gethrmsmprapplicantsByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsmprapplicant'+'/e/'+id).toPromise();
  }
  }
  gethrmsmprapplicantsByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsmprapplicant'+'/'+id).toPromise();
  }
  }

  deletehrmsmprapplicant(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntirehrmsURL + '/hrmsmprapplicant'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntirehrmsURL + '/hrmsmprapplicant')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

