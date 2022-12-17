import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { hrmspaschedule } from '../model/hrmspaschedule.model';
import { hrmspadecisionmanagement } from '../model/hrmspadecisionmanagement.model';
import { hrmsparesponse } from '../model/hrmsparesponse.model';
import { environment } from '../../environments/environment';
import { IhrmspascheduleResponse } from '../model/hrmspaschedule.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class hrmspascheduleService {
  formData: hrmspaschedule;
  readonly rootURL = AppConstants.baseURL;
  list: hrmspaschedule[];
  hrmspadecisionmanagements: hrmspadecisionmanagement[]=[];
  hrmsparesponses: hrmsparesponse[]=[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatehrmspaschedules():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
      hrmspadecisionmanagements: this.hrmspadecisionmanagements.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
      hrmsparesponses: this.hrmsparesponses.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
    };
    return this.http.post(AppConstants.ntirehrmsURL + '/hrmspaschedule', body);
  }
  }

  saveOrUpdatehrmspaschedulesList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntirehrmsURL + '/hrmspaschedule', body);
  }
  }

  gethrmspaschedulesList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmspaschedule').toPromise();
  }
  }
  getListBypaid(paid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmspaschedule'+'/paid/'+paid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmspaschedule'+'/param/'+key).toPromise();
  }
  }


  gethrmspaschedulesByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmspaschedule'+'/e/'+id).toPromise();
  }
  }
  gethrmspaschedulesByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmspaschedule'+'/'+id).toPromise();
  }
  }

  deletehrmspaschedule(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntirehrmsURL + '/hrmspaschedule'+'/'+id).toPromise();
  }
  }
clearList(){
this.hrmspadecisionmanagements = [];
this.hrmsparesponses = [];
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntirehrmsURL + '/hrmspaschedule')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

