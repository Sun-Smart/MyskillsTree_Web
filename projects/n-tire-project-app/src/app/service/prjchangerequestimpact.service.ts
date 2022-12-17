import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { prjchangerequestimpact } from '../model/prjchangerequestimpact.model';
import { environment } from '../../environments/environment';
import { IprjchangerequestimpactResponse } from '../model/prjchangerequestimpact.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class prjchangerequestimpactService {
  formData: prjchangerequestimpact;
  readonly rootURL = AppConstants.ntireprojectURL;
  list: prjchangerequestimpact[];

  constructor(private http: HttpClient,public sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdateprjchangerequestimpacts():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(this.rootURL + '/prjchangerequestimpact', body);
  }
  }

  saveOrUpdateprjchangerequestimpactsList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(this.rootURL + '/prjchangerequestimpact', body);
  }
  }

  getprjchangerequestimpactsList():any {
  if (this.valid()){ 
    return this.http.get(this.rootURL + '/prjchangerequestimpact').toPromise();
  }
  }
  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(this.rootURL + '/prjchangerequestimpact'+'/param/'+key).toPromise();
  }
  }


  getprjchangerequestimpactsByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(this.rootURL + '/prjchangerequestimpact'+'/e/'+id).toPromise();
  }
  }
  getprjchangerequestimpactsByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(this.rootURL + '/prjchangerequestimpact'+'/'+id).toPromise();
  }
  }

  deleteprjchangerequestimpact(id:number):any {
  if (this.valid()){ 
    return this.http.delete(this.rootURL + '/prjchangerequestimpact'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(this.rootURL + '/prjchangerequestimpact')
.toPromise()
.then((res:any) => this.list = res as any[]);
}
}


}

