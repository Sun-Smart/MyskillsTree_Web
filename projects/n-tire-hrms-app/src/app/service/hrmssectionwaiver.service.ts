import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { hrmssectionwaiver } from '../model/hrmssectionwaiver.model';
import { environment } from '../../environments/environment';
import { IhrmssectionwaiverResponse } from '../model/hrmssectionwaiver.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class hrmssectionwaiverService {
  formData: hrmssectionwaiver;
  readonly rootURL = AppConstants.baseURL;
  list: hrmssectionwaiver[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatehrmssectionwaivers():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntirehrmsURL + '/hrmssectionwaiver', body);
  }
  }

  saveOrUpdatehrmssectionwaiversList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntirehrmsURL + '/hrmssectionwaiver', body);
  }
  }

  gethrmssectionwaiversList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmssectionwaiver').toPromise();
  }
  }
  getListByswaiverid(swaiverid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmssectionwaiver'+'/swaiverid/'+swaiverid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmssectionwaiver'+'/param/'+key).toPromise();
  }
  }


  gethrmssectionwaiversByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmssectionwaiver'+'/e/'+id).toPromise();
  }
  }
  gethrmssectionwaiversByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmssectionwaiver'+'/'+id).toPromise();
  }
  }

  deletehrmssectionwaiver(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntirehrmsURL + '/hrmssectionwaiver'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntirehrmsURL + '/hrmssectionwaiver')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

