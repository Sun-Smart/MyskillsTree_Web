import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { hrmsstatutoryrole } from '../model/hrmsstatutoryrole.model';
import { environment } from '../../environments/environment';
import { IhrmsstatutoryroleResponse } from '../model/hrmsstatutoryrole.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class hrmsstatutoryroleService {
  formData: hrmsstatutoryrole;
  readonly rootURL = AppConstants.baseURL;
  list: hrmsstatutoryrole[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatehrmsstatutoryroles():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntirehrmsURL + '/hrmsstatutoryrole', body);
  }
  }

  saveOrUpdatehrmsstatutoryrolesList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntirehrmsURL + '/hrmsstatutoryrole', body);
  }
  }

  gethrmsstatutoryrolesList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsstatutoryrole').toPromise();
  }
  }
  getListBystatutoryroleid(statutoryroleid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsstatutoryrole'+'/statutoryroleid/'+statutoryroleid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsstatutoryrole'+'/param/'+key).toPromise();
  }
  }


  gethrmsstatutoryrolesByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsstatutoryrole'+'/e/'+id).toPromise();
  }
  }
  gethrmsstatutoryrolesByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsstatutoryrole'+'/'+id).toPromise();
  }
  }

  deletehrmsstatutoryrole(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntirehrmsURL + '/hrmsstatutoryrole'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntirehrmsURL + '/hrmsstatutoryrole')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

