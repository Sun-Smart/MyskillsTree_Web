import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { boschedule } from '../model/boschedule.model';
import { boschedulerun } from '../model/boschedulerun.model';
import { environment } from '../../environments/environment';
import { IboscheduleResponse } from '../model/boschedule.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../shared/helper'
import { SessionService } from '../pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class boscheduleService {
  formData: boschedule;
  readonly rootURL = AppConstants.baseURL;
  boscheduleruns: boschedulerun[]=[];
  list: boschedule[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdateboschedules():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
      boscheduleruns: this.boscheduleruns.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
    };
    return this.http.post(AppConstants.ntireboURL + '/boschedule', body);
  }
  }

  saveOrUpdateboschedulesList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntireboURL + '/boschedule', body);
  }
  }

  getboschedulesList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/boschedule').toPromise();
  }
  }
  getListByscheduleid(scheduleid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/boschedule'+'/scheduleid/'+scheduleid).toPromise();
  }
  }

  getListBysourcereference(sourcereference:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/boschedule'+'/sourcereference/'+sourcereference).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/boschedule'+'/param/'+key).toPromise();
  }
  }


  getboschedulesByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/boschedule'+'/e/'+id).toPromise();
  }
  }
  getboschedulesByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/boschedule'+'/'+id).toPromise();
  }
  }

  deleteboschedule(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntireboURL + '/boschedule'+'/'+id).toPromise();
  }
  }
clearList(){
this.boscheduleruns = [];
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntireboURL + '/boschedule')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

