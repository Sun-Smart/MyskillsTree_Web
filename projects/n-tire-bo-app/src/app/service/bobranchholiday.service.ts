import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { bobranchholiday } from '../model/bobranchholiday.model';
import { environment } from '../../environments/environment';
import { IbobranchholidayResponse } from '../model/bobranchholiday.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../shared/helper'
import { SessionService } from '../pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class bobranchholidayService {
  formData: bobranchholiday;
  readonly rootURL = AppConstants.baseURL;
  list: bobranchholiday[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatebobranchholidays():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntireboURL + '/bobranchholiday', body);
  }
  }

  saveOrUpdatebobranchholidaysList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntireboURL + '/bobranchholiday', body);
  }
  }

  getbobranchholidaysList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/bobranchholiday').toPromise();
  }
  }
  getListBybranchholidayid(branchholidayid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/bobranchholiday'+'/branchholidayid/'+branchholidayid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/bobranchholiday'+'/param/'+key).toPromise();
  }
  }


  getbobranchholidaysByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/bobranchholiday'+'/e/'+id).toPromise();
  }
  }
  getbobranchholidaysByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/bobranchholiday'+'/'+id).toPromise();
  }
  }

  deletebobranchholiday(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntireboURL + '/bobranchholiday'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntireboURL + '/bobranchholiday')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

