import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { hlpservicecontinuityplan } from '../model/hlpservicecontinuityplan.model';
import { hlpservicecontinuityplandetail } from '../model/hlpservicecontinuityplandetail.model';
import { environment } from '../../environments/environment';
import { IhlpservicecontinuityplanResponse } from '../model/hlpservicecontinuityplan.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class hlpservicecontinuityplanService {
  formData: hlpservicecontinuityplan;
  readonly rootURL = AppConstants.baseURL;
  list: hlpservicecontinuityplan[];
  hlpservicecontinuityplandetails: hlpservicecontinuityplandetail[]=[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatehlpservicecontinuityplans():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
      hlpservicecontinuityplandetails: this.hlpservicecontinuityplandetails.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
    };
    return this.http.post(AppConstants.ntirehelpdeskURL + '/hlpservicecontinuityplan', body);
  }
  }

  saveOrUpdatehlpservicecontinuityplansList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntirehelpdeskURL + '/hlpservicecontinuityplan', body);
  }
  }

  gethlpservicecontinuityplansList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehelpdeskURL + '/hlpservicecontinuityplan').toPromise();
  }
  }
  getListByplanid(planid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehelpdeskURL + '/hlpservicecontinuityplan'+'/planid/'+planid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehelpdeskURL + '/hlpservicecontinuityplan'+'/param/'+key).toPromise();
  }
  }


  gethlpservicecontinuityplansByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehelpdeskURL + '/hlpservicecontinuityplan'+'/e/'+id).toPromise();
  }
  }
  gethlpservicecontinuityplansByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehelpdeskURL + '/hlpservicecontinuityplan'+'/'+id).toPromise();
  }
  }

  deletehlpservicecontinuityplan(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntirehelpdeskURL + '/hlpservicecontinuityplan'+'/'+id).toPromise();
  }
  }
clearList(){
this.hlpservicecontinuityplandetails = [];
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntirehelpdeskURL + '/hlpservicecontinuityplan')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

