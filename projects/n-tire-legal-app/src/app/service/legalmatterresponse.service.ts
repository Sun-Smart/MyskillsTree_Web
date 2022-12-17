import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { legalmatterresponse } from '../model/legalmatterresponse.model';
import { environment } from '../../environments/environment';
import { IlegalmatterresponseResponse } from '../model/legalmatterresponse.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class legalmatterresponseService {
  formData: legalmatterresponse;
  readonly rootURL = AppConstants.baseURL;
  list: legalmatterresponse[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatelegalmatterresponses():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntirelegalURL + '/legalmatterresponse', body);
  }
  }

  saveOrUpdatelegalmatterresponsesList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntirelegalURL + '/legalmatterresponse', body);
  }
  }

  getlegalmatterresponsesList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirelegalURL + '/legalmatterresponse').toPromise();
  }
  }
  getListBymatterresponseid(matterresponseid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirelegalURL + '/legalmatterresponse'+'/matterresponseid/'+matterresponseid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirelegalURL + '/legalmatterresponse'+'/param/'+key).toPromise();
  }
  }


  getlegalmatterresponsesByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirelegalURL + '/legalmatterresponse'+'/e/'+id).toPromise();
  }
  }
  getlegalmatterresponsesByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirelegalURL + '/legalmatterresponse'+'/'+id).toPromise();
  }
  }

  deletelegalmatterresponse(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntirelegalURL + '/legalmatterresponse'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntirelegalURL + '/legalmatterresponse')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

