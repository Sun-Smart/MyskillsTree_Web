import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { hrmsletterrequest } from '../model/hrmsletterrequest.model';
import { environment } from '../../environments/environment';
import { IhrmsletterrequestResponse } from '../model/hrmsletterrequest.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class hrmsletterrequestService {
  formData: hrmsletterrequest;
  readonly rootURL = AppConstants.baseURL;
  list: hrmsletterrequest[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatehrmsletterrequests():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntirehrmsURL + '/hrmsletterrequest', body);
  }
  }

  saveOrUpdatehrmsletterrequestsList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntirehrmsURL + '/hrmsletterrequest', body);
  }
  }

  gethrmsletterrequestsList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsletterrequest').toPromise();
  }
  }
  getListBylrequestid(lrequestid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsletterrequest'+'/lrequestid/'+lrequestid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsletterrequest'+'/param/'+key).toPromise();
  }
  }


  gethrmsletterrequestsByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsletterrequest'+'/e/'+id).toPromise();
  }
  }
  gethrmsletterrequestsByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsletterrequest'+'/'+id).toPromise();
  }
  }

  deletehrmsletterrequest(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntirehrmsURL + '/hrmsletterrequest'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntirehrmsURL + '/hrmsletterrequest')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

