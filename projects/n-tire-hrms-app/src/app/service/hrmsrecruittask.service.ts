import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { hrmsrecruittask } from '../model/hrmsrecruittask.model';
import { environment } from '../../environments/environment';
import { IhrmsrecruittaskResponse } from '../model/hrmsrecruittask.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class hrmsrecruittaskService {
  formData: hrmsrecruittask;
  readonly rootURL = AppConstants.baseURL;
  list: hrmsrecruittask[];
DeletedhrmsrecruittaskIDs:string="";

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatehrmsrecruittasks():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntirehrmsURL + '/hrmsrecruittask', body);
  }
  }

  saveOrUpdatehrmsrecruittasksList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
DeletedhrmsrecruittaskIDs:this.DeletedhrmsrecruittaskIDs,    };
    return this.http.post(AppConstants.ntirehrmsURL + '/hrmsrecruittask', body);
  }
  }

  gethrmsrecruittasksList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsrecruittask').toPromise();
  }
  }
  getListBytaskid(taskid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsrecruittask'+'/taskid/'+taskid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsrecruittask'+'/param/'+key).toPromise();
  }
  }


  gethrmsrecruittasksByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsrecruittask'+'/e/'+id).toPromise();
  }
  }
  gethrmsrecruittasksByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsrecruittask'+'/'+id).toPromise();
  }
  }

  deletehrmsrecruittask(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntirehrmsURL + '/hrmsrecruittask'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntirehrmsURL + '/hrmsrecruittask')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

