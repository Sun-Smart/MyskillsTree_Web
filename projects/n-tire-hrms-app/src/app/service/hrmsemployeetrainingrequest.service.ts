import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { hrmsemployeetrainingrequest } from '../model/hrmsemployeetrainingrequest.model';
import { environment } from '../../environments/environment';
import { IhrmsemployeetrainingrequestResponse } from '../model/hrmsemployeetrainingrequest.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class hrmsemployeetrainingrequestService {
  formData: hrmsemployeetrainingrequest;
  readonly rootURL = AppConstants.baseURL;
  list: hrmsemployeetrainingrequest[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatehrmsemployeetrainingrequests():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntirehrmsURL + '/hrmsemployeetrainingrequest', body);
  }
  }

  saveOrUpdatehrmsemployeetrainingrequestsList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntirehrmsURL + '/hrmsemployeetrainingrequest', body);
  }
  }

  gethrmsemployeetrainingrequestsList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeetrainingrequest').toPromise();
  }
  }
  getListByrequestid(requestid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeetrainingrequest'+'/requestid/'+requestid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeetrainingrequest'+'/param/'+key).toPromise();
  }
  }


  gethrmsemployeetrainingrequestsByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeetrainingrequest'+'/e/'+id).toPromise();
  }
  }
  gethrmsemployeetrainingrequestsByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeetrainingrequest'+'/'+id).toPromise();
  }
  }

  deletehrmsemployeetrainingrequest(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntirehrmsURL + '/hrmsemployeetrainingrequest'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeetrainingrequest')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

