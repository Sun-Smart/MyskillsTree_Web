import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { hrmsinterviewschedule } from '../model/hrmsinterviewschedule.model';
import { hrmsinterviewscoring } from '../model/hrmsinterviewscoring.model';
import { environment } from '../../environments/environment';
import { IhrmsinterviewscheduleResponse } from '../model/hrmsinterviewschedule.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class hrmsinterviewscheduleService {
  formData: hrmsinterviewschedule;
  readonly rootURL = AppConstants.baseURL;
  list: hrmsinterviewschedule[];
  hrmsinterviewscorings: hrmsinterviewscoring[]=[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatehrmsinterviewschedules():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
      hrmsinterviewscorings: this.hrmsinterviewscorings.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
    };
    return this.http.post(AppConstants.ntirehrmsURL + '/hrmsinterviewschedule', body);
  }
  }

  saveOrUpdatehrmsinterviewschedulesList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntirehrmsURL + '/hrmsinterviewschedule', body);
  }
  }

  gethrmsinterviewschedulesList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsinterviewschedule').toPromise();
  }
  }
  getListByinterviewid(interviewid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsinterviewschedule'+'/interviewid/'+interviewid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsinterviewschedule'+'/param/'+key).toPromise();
  }
  }


  gethrmsinterviewschedulesByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsinterviewschedule'+'/e/'+id).toPromise();
  }
  }
  gethrmsinterviewschedulesByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsinterviewschedule'+'/'+id).toPromise();
  }
  }

  deletehrmsinterviewschedule(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntirehrmsURL + '/hrmsinterviewschedule'+'/'+id).toPromise();
  }
  }
clearList(){
this.hrmsinterviewscorings = [];
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntirehrmsURL + '/hrmsinterviewschedule')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

