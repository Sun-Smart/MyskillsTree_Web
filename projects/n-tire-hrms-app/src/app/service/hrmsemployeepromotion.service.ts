import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { hrmsemployeepromotion } from '../model/hrmsemployeepromotion.model';
import { environment } from '../../environments/environment';
import { IhrmsemployeepromotionResponse } from '../model/hrmsemployeepromotion.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class hrmsemployeepromotionService {
  formData: hrmsemployeepromotion;
  readonly rootURL = AppConstants.baseURL;
  list: hrmsemployeepromotion[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatehrmsemployeepromotions():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntirehrmsURL + '/hrmsemployeepromotion', body);
  }
  }

  saveOrUpdatehrmsemployeepromotionsList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntirehrmsURL + '/hrmsemployeepromotion', body);
  }
  }

  gethrmsemployeepromotionsList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeepromotion').toPromise();
  }
  }
  getListBypromotionid(promotionid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeepromotion'+'/promotionid/'+promotionid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeepromotion'+'/param/'+key).toPromise();
  }
  }


  gethrmsemployeepromotionsByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeepromotion'+'/e/'+id).toPromise();
  }
  }
  gethrmsemployeepromotionsByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeepromotion'+'/'+id).toPromise();
  }
  }

  deletehrmsemployeepromotion(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntirehrmsURL + '/hrmsemployeepromotion'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeepromotion')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

