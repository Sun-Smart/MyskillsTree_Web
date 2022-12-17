import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { hrmsquestionmaster } from '../model/hrmsquestionmaster.model';
import { environment } from '../../environments/environment';
import { IhrmsquestionmasterResponse } from '../model/hrmsquestionmaster.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class hrmsquestionmasterService {
  formData: hrmsquestionmaster;
  readonly rootURL = AppConstants.baseURL;
  list: hrmsquestionmaster[];
DeletedhrmsquestionmasterIDs:string="";

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatehrmsquestionmasters():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntirehrmsURL + '/hrmsquestionmaster', body);
  }
  }

  saveOrUpdatehrmsquestionmastersList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
DeletedhrmsquestionmasterIDs:this.DeletedhrmsquestionmasterIDs,    };
    return this.http.post(AppConstants.ntirehrmsURL + '/hrmsquestionmaster', body);
  }
  }

  gethrmsquestionmastersList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsquestionmaster').toPromise();
  }
  }
  getListByqmid(qmid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsquestionmaster'+'/qmid/'+qmid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsquestionmaster'+'/param/'+key).toPromise();
  }
  }


  gethrmsquestionmastersByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsquestionmaster'+'/e/'+id).toPromise();
  }
  }
  gethrmsquestionmastersByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsquestionmaster'+'/'+id).toPromise();
  }
  }

  deletehrmsquestionmaster(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntirehrmsURL + '/hrmsquestionmaster'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntirehrmsURL + '/hrmsquestionmaster')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

