import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { hrmsemployeesectionwaiver } from '../model/hrmsemployeesectionwaiver.model';
import { environment } from '../../environments/environment';
import { IhrmsemployeesectionwaiverResponse } from '../model/hrmsemployeesectionwaiver.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class hrmsemployeesectionwaiverService {
  formData: hrmsemployeesectionwaiver;
  readonly rootURL = AppConstants.baseURL;
  list: hrmsemployeesectionwaiver[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatehrmsemployeesectionwaivers():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntirehrmsURL + '/hrmsemployeesectionwaiver', body);
  }
  }

  saveOrUpdatehrmsemployeesectionwaiversList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntirehrmsURL + '/hrmsemployeesectionwaiver', body);
  }
  }

  gethrmsemployeesectionwaiversList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeesectionwaiver').toPromise();
  }
  }
  getListBywaiverid(waiverid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeesectionwaiver'+'/waiverid/'+waiverid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeesectionwaiver'+'/param/'+key).toPromise();
  }
  }


  gethrmsemployeesectionwaiversByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeesectionwaiver'+'/e/'+id).toPromise();
  }
  }
  gethrmsemployeesectionwaiversByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeesectionwaiver'+'/'+id).toPromise();
  }
  }

  deletehrmsemployeesectionwaiver(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntirehrmsURL + '/hrmsemployeesectionwaiver'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeesectionwaiver')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

