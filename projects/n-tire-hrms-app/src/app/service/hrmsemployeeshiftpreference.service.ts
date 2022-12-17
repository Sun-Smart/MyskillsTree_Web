import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { hrmsemployeeshiftpreference } from '../model/hrmsemployeeshiftpreference.model';
import { environment } from '../../environments/environment';
import { IhrmsemployeeshiftpreferenceResponse } from '../model/hrmsemployeeshiftpreference.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class hrmsemployeeshiftpreferenceService {
  formData: hrmsemployeeshiftpreference;
  readonly rootURL = AppConstants.baseURL;
  list: hrmsemployeeshiftpreference[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatehrmsemployeeshiftpreferences():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntirehrmsURL + '/hrmsemployeeshiftpreference', body);
  }
  }

  saveOrUpdatehrmsemployeeshiftpreferencesList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntirehrmsURL + '/hrmsemployeeshiftpreference', body);
  }
  }

  gethrmsemployeeshiftpreferencesList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeeshiftpreference').toPromise();
  }
  }
  getListByprefid(prefid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeeshiftpreference'+'/prefid/'+prefid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeeshiftpreference'+'/param/'+key).toPromise();
  }
  }


  gethrmsemployeeshiftpreferencesByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeeshiftpreference'+'/e/'+id).toPromise();
  }
  }
  gethrmsemployeeshiftpreferencesByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeeshiftpreference'+'/'+id).toPromise();
  }
  }

  deletehrmsemployeeshiftpreference(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntirehrmsURL + '/hrmsemployeeshiftpreference'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeeshiftpreference')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

