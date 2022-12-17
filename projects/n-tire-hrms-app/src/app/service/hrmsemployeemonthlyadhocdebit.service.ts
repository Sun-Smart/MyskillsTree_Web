import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { hrmsemployeemonthlyadhocdebit } from '../model/hrmsemployeemonthlyadhocdebit.model';
import { environment } from '../../environments/environment';
import { IhrmsemployeemonthlyadhocdebitResponse } from '../model/hrmsemployeemonthlyadhocdebit.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class hrmsemployeemonthlyadhocdebitService {
  formData: hrmsemployeemonthlyadhocdebit;
  readonly rootURL = AppConstants.baseURL;
  list: hrmsemployeemonthlyadhocdebit[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatehrmsemployeemonthlyadhocdebits():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntirehrmsURL + '/hrmsemployeemonthlyadhocdebit', body);
  }
  }

  saveOrUpdatehrmsemployeemonthlyadhocdebitsList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntirehrmsURL + '/hrmsemployeemonthlyadhocdebit', body);
  }
  }

  gethrmsemployeemonthlyadhocdebitsList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeemonthlyadhocdebit').toPromise();
  }
  }
  getListBypkid(pkid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeemonthlyadhocdebit'+'/pkid/'+pkid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeemonthlyadhocdebit'+'/param/'+key).toPromise();
  }
  }


  gethrmsemployeemonthlyadhocdebitsByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeemonthlyadhocdebit'+'/e/'+id).toPromise();
  }
  }
  gethrmsemployeemonthlyadhocdebitsByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeemonthlyadhocdebit'+'/'+id).toPromise();
  }
  }

  deletehrmsemployeemonthlyadhocdebit(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntirehrmsURL + '/hrmsemployeemonthlyadhocdebit'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeemonthlyadhocdebit')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

