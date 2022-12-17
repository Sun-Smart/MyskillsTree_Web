import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { prjreleaseteamresponse } from '../model/prjreleaseteamresponse.model';
import { environment } from '../../environments/environment';
import { IprjreleaseteamresponseResponse } from '../model/prjreleaseteamresponse.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class prjreleaseteamresponseService {
  formData: prjreleaseteamresponse;
  readonly rootURL = AppConstants.ntireprojectURL;
  list: prjreleaseteamresponse[];

  constructor(private http: HttpClient,public sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdateprjreleaseteamresponses():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(this.rootURL + '/prjreleaseteamresponse', body);
  }
  }

  saveOrUpdateprjreleaseteamresponsesList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(this.rootURL + '/prjreleaseteamresponse', body);
  }
  }

  getprjreleaseteamresponsesList():any {
  if (this.valid()){ 
    return this.http.get(this.rootURL + '/prjreleaseteamresponse').toPromise();
  }
  }
  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(this.rootURL + '/prjreleaseteamresponse'+'/param/'+key).toPromise();
  }
  }


  getprjreleaseteamresponsesByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(this.rootURL + '/prjreleaseteamresponse'+'/e/'+id).toPromise();
  }
  }
  getprjreleaseteamresponsesByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(this.rootURL + '/prjreleaseteamresponse'+'/'+id).toPromise();
  }
  }

  deleteprjreleaseteamresponse(id:number):any {
  if (this.valid()){ 
    return this.http.delete(this.rootURL + '/prjreleaseteamresponse'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(this.rootURL + '/prjreleaseteamresponse')
.toPromise()
.then((res:any) => this.list = res as any[]);
}
}


}

