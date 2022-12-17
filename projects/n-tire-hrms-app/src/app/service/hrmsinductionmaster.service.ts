import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { hrmsinductionmaster } from '../model/hrmsinductionmaster.model';
import { hrmsinductionemployee } from '../model/hrmsinductionemployee.model';
import { hrmsinductionschedule } from '../model/hrmsinductionschedule.model';
import { environment } from '../../environments/environment';
import { IhrmsinductionmasterResponse } from '../model/hrmsinductionmaster.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class hrmsinductionmasterService {
  formData: hrmsinductionmaster;
  readonly rootURL = AppConstants.baseURL;
  list: hrmsinductionmaster[];
  hrmsinductionemployees: hrmsinductionemployee[]=[];
  hrmsinductionschedules: hrmsinductionschedule[]=[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatehrmsinductionmasters():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
      hrmsinductionemployees: this.hrmsinductionemployees.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
      hrmsinductionschedules: this.hrmsinductionschedules.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
    };
    return this.http.post(AppConstants.ntirehrmsURL + '/hrmsinductionmaster', body);
  }
  }

  saveOrUpdatehrmsinductionmastersList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntirehrmsURL + '/hrmsinductionmaster', body);
  }
  }

  gethrmsinductionmastersList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsinductionmaster').toPromise();
  }
  }
  getListByinductionmasterid(inductionmasterid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsinductionmaster'+'/inductionmasterid/'+inductionmasterid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsinductionmaster'+'/param/'+key).toPromise();
  }
  }


  gethrmsinductionmastersByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsinductionmaster'+'/e/'+id).toPromise();
  }
  }
  gethrmsinductionmastersByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsinductionmaster'+'/'+id).toPromise();
  }
  }

  deletehrmsinductionmaster(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntirehrmsURL + '/hrmsinductionmaster'+'/'+id).toPromise();
  }
  }
clearList(){
this.hrmsinductionemployees = [];
this.hrmsinductionschedules = [];
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntirehrmsURL + '/hrmsinductionmaster')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

