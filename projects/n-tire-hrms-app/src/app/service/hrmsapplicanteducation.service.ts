import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { hrmsapplicanteducation } from '../model/hrmsapplicanteducation.model';
import { environment } from '../../environments/environment';
import { IhrmsapplicanteducationResponse } from '../model/hrmsapplicanteducation.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class hrmsapplicanteducationService {
  formData: hrmsapplicanteducation;
  readonly rootURL = AppConstants.baseURL;
  list: hrmsapplicanteducation[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatehrmsapplicanteducations():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntirehrmsURL + '/hrmsapplicanteducation', body);
  }
  }

  saveOrUpdatehrmsapplicanteducationsList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntirehrmsURL + '/hrmsapplicanteducation', body);
  }
  }

  gethrmsapplicanteducationsList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsapplicanteducation').toPromise();
  }
  }
  getListByhaeid(haeid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsapplicanteducation'+'/haeid/'+haeid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsapplicanteducation'+'/param/'+key).toPromise();
  }
  }


  gethrmsapplicanteducationsByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsapplicanteducation'+'/e/'+id).toPromise();
  }
  }
  gethrmsapplicanteducationsByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsapplicanteducation'+'/'+id).toPromise();
  }
  }

  deletehrmsapplicanteducation(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntirehrmsURL + '/hrmsapplicanteducation'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntirehrmsURL + '/hrmsapplicanteducation')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

