import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { vmsworkplacerequest } from '../model/vmsworkplacerequest.model';
import { environment } from '../../environments/environment';
import { IvmsworkplacerequestResponse } from '../model/vmsworkplacerequest.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class vmsworkplacerequestService {
  formData: vmsworkplacerequest;
  readonly rootURL = AppConstants.baseURL;
  list: vmsworkplacerequest[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatevmsworkplacerequests():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntirevisitorURL + '/vmsworkplacerequest', body);
  }
  }

  saveOrUpdatevmsworkplacerequestsList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntirevisitorURL + '/vmsworkplacerequest', body);
  }
  }

  getvmsworkplacerequestsList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirevisitorURL + '/vmsworkplacerequest').toPromise();
  }
  }
  getListByrequestid(requestid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirevisitorURL + '/vmsworkplacerequest'+'/requestid/'+requestid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirevisitorURL + '/vmsworkplacerequest'+'/param/'+key).toPromise();
  }
  }


  getvmsworkplacerequestsByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirevisitorURL + '/vmsworkplacerequest'+'/e/'+id).toPromise();
  }
  }
  getvmsworkplacerequestsByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirevisitorURL + '/vmsworkplacerequest'+'/'+id).toPromise();
  }
  }

  deletevmsworkplacerequest(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntirevisitorURL + '/vmsworkplacerequest'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntirevisitorURL + '/vmsworkplacerequest')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

