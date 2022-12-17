import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { hrmsmanpowerrequest } from '../model/hrmsmanpowerrequest.model';
import { hrmsmprassign } from '../model/hrmsmprassign.model';
import { hrmsmprapplicant } from '../model/hrmsmprapplicant.model';
import { hrmsinterviewschedule } from '../model/hrmsinterviewschedule.model';
import { hrmsmpragency } from '../model/hrmsmpragency.model';
import { environment } from '../../environments/environment';
import { IhrmsmanpowerrequestResponse } from '../model/hrmsmanpowerrequest.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class hrmsmanpowerrequestService {
  formData: hrmsmanpowerrequest;
  readonly rootURL = AppConstants.baseURL;
  list: hrmsmanpowerrequest[];
  hrmsmprassigns: hrmsmprassign[]=[];
  hrmsmprapplicants: hrmsmprapplicant[]=[];
  hrmsinterviewschedules: hrmsinterviewschedule[]=[];
  hrmsmpragencies: hrmsmpragency[]=[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatehrmsmanpowerrequests():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
      hrmsmprassigns: this.hrmsmprassigns.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
      hrmsmprapplicants: this.hrmsmprapplicants.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
      hrmsinterviewschedules: this.hrmsinterviewschedules.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
      hrmsmpragencies: this.hrmsmpragencies.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
    };
    return this.http.post(AppConstants.ntirehrmsURL + '/hrmsmanpowerrequest', body);
  }
  }

  saveOrUpdatehrmsmanpowerrequestsList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntirehrmsURL + '/hrmsmanpowerrequest', body);
  }
  }

  gethrmsmanpowerrequestsList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsmanpowerrequest').toPromise();
  }
  }
  getListBymprid(mprid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsmanpowerrequest'+'/mprid/'+mprid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsmanpowerrequest'+'/param/'+key).toPromise();
  }
  }


  gethrmsmanpowerrequestsByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsmanpowerrequest'+'/e/'+id).toPromise();
  }
  }
  gethrmsmanpowerrequestsByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsmanpowerrequest'+'/'+id).toPromise();
  }
  }

  deletehrmsmanpowerrequest(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntirehrmsURL + '/hrmsmanpowerrequest'+'/'+id).toPromise();
  }
  }
clearList(){
this.hrmsmprassigns = [];
this.hrmsmprapplicants = [];
this.hrmsinterviewschedules = [];
this.hrmsmpragencies = [];
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntirehrmsURL + '/hrmsmanpowerrequest')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

