import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { hrmsemployeevisa } from '../model/hrmsemployeevisa.model';
import { environment } from '../../environments/environment';
import { IhrmsemployeevisaResponse } from '../model/hrmsemployeevisa.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class hrmsemployeevisaService {
  formData: hrmsemployeevisa;
  readonly rootURL = AppConstants.baseURL;
  list: hrmsemployeevisa[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatehrmsemployeevisas():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntirehrmsURL + '/hrmsemployeevisa', body);
  }
  }

  saveOrUpdatehrmsemployeevisasList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntirehrmsURL + '/hrmsemployeevisa', body);
  }
  }

  gethrmsemployeevisasList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeevisa').toPromise();
  }
  }
  getListByvisaid(visaid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeevisa'+'/visaid/'+visaid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeevisa'+'/param/'+key).toPromise();
  }
  }


  gethrmsemployeevisasByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeevisa'+'/e/'+id).toPromise();
  }
  }
  gethrmsemployeevisasByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeevisa'+'/'+id).toPromise();
  }
  }

  deletehrmsemployeevisa(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntirehrmsURL + '/hrmsemployeevisa'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeevisa')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

