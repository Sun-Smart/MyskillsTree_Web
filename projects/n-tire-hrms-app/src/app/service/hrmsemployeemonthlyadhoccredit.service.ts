import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { hrmsemployeemonthlyadhoccredit } from '../model/hrmsemployeemonthlyadhoccredit.model';
import { environment } from '../../environments/environment';
import { IhrmsemployeemonthlyadhoccreditResponse } from '../model/hrmsemployeemonthlyadhoccredit.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class hrmsemployeemonthlyadhoccreditService {
  formData: hrmsemployeemonthlyadhoccredit;
  readonly rootURL = AppConstants.baseURL;
  list: hrmsemployeemonthlyadhoccredit[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatehrmsemployeemonthlyadhoccredits():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntirehrmsURL + '/hrmsemployeemonthlyadhoccredit', body);
  }
  }

  saveOrUpdatehrmsemployeemonthlyadhoccreditsList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntirehrmsURL + '/hrmsemployeemonthlyadhoccredit', body);
  }
  }

  gethrmsemployeemonthlyadhoccreditsList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeemonthlyadhoccredit').toPromise();
  }
  }
  getListBypkid(pkid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeemonthlyadhoccredit'+'/pkid/'+pkid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeemonthlyadhoccredit'+'/param/'+key).toPromise();
  }
  }


  gethrmsemployeemonthlyadhoccreditsByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeemonthlyadhoccredit'+'/e/'+id).toPromise();
  }
  }
  gethrmsemployeemonthlyadhoccreditsByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeemonthlyadhoccredit'+'/'+id).toPromise();
  }
  }

  deletehrmsemployeemonthlyadhoccredit(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntirehrmsURL + '/hrmsemployeemonthlyadhoccredit'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeemonthlyadhoccredit')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

