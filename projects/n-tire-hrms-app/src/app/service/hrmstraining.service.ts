import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { hrmstraining } from '../model/hrmstraining.model';
import { hrmsemployeetraining } from '../model/hrmsemployeetraining.model';
import { environment } from '../../environments/environment';
import { IhrmstrainingResponse } from '../model/hrmstraining.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class hrmstrainingService {
  formData: hrmstraining;
  readonly rootURL = AppConstants.baseURL;
  list: hrmstraining[];
  hrmsemployeetrainings: hrmsemployeetraining[]=[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatehrmstrainings():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
      hrmsemployeetrainings: this.hrmsemployeetrainings.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
    };
    return this.http.post(AppConstants.ntirehrmsURL + '/hrmstraining', body);
  }
  }

  saveOrUpdatehrmstrainingsList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntirehrmsURL + '/hrmstraining', body);
  }
  }

  gethrmstrainingsList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmstraining').toPromise();
  }
  }
  getListBytrainingid(trainingid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmstraining'+'/trainingid/'+trainingid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmstraining'+'/param/'+key).toPromise();
  }
  }


  gethrmstrainingsByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmstraining'+'/e/'+id).toPromise();
  }
  }
  gethrmstrainingsByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmstraining'+'/'+id).toPromise();
  }
  }

  deletehrmstraining(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntirehrmsURL + '/hrmstraining'+'/'+id).toPromise();
  }
  }
clearList(){
this.hrmsemployeetrainings = [];
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntirehrmsURL + '/hrmstraining')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

