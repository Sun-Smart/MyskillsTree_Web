import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { hrmsadvancerequestmaster } from '../model/hrmsadvancerequestmaster.model';
import { environment } from '../../environments/environment';
import { IhrmsadvancerequestmasterResponse } from '../model/hrmsadvancerequestmaster.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class hrmsadvancerequestmasterService {
  formData: hrmsadvancerequestmaster;
  readonly rootURL = AppConstants.baseURL;
  list: hrmsadvancerequestmaster[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatehrmsadvancerequestmasters():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntirehrmsURL + '/hrmsadvancerequestmaster', body);
  }
  }

  saveOrUpdatehrmsadvancerequestmastersList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntirehrmsURL + '/hrmsadvancerequestmaster', body);
  }
  }

  gethrmsadvancerequestmastersList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsadvancerequestmaster').toPromise();
  }
  }
  getListByrequestid(requestid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsadvancerequestmaster'+'/requestid/'+requestid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsadvancerequestmaster'+'/param/'+key).toPromise();
  }
  }


  gethrmsadvancerequestmastersByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsadvancerequestmaster'+'/e/'+id).toPromise();
  }
  }
  gethrmsadvancerequestmastersByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsadvancerequestmaster'+'/'+id).toPromise();
  }
  }

  deletehrmsadvancerequestmaster(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntirehrmsURL + '/hrmsadvancerequestmaster'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntirehrmsURL + '/hrmsadvancerequestmaster')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

