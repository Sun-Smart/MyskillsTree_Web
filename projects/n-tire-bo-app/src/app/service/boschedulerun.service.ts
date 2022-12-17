import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { boschedulerun } from '../model/boschedulerun.model';
import { environment } from '../../environments/environment';
import { IboschedulerunResponse } from '../model/boschedulerun.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../shared/helper'
import { SessionService } from '../pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class boschedulerunService {
  formData: boschedulerun;
  readonly rootURL = AppConstants.baseURL;
  list: boschedulerun[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdateboscheduleruns():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntireboURL + '/boschedulerun', body);
  }
  }

  saveOrUpdateboschedulerunsList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntireboURL + '/boschedulerun', body);
  }
  }

  getboschedulerunsList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/boschedulerun').toPromise();
  }
  }
  getListByschedulerunid(schedulerunid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/boschedulerun'+'/schedulerunid/'+schedulerunid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/boschedulerun'+'/param/'+key).toPromise();
  }
  }


  getboschedulerunsByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/boschedulerun'+'/e/'+id).toPromise();
  }
  }
  getboschedulerunsByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/boschedulerun'+'/'+id).toPromise();
  }
  }

  deleteboschedulerun(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntireboURL + '/boschedulerun'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntireboURL + '/boschedulerun')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

