import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { camsworktimelog } from '../model/camsworktimelog.model';
import { camsworkreading } from '../model/camsworkreading.model';
import { environment } from '../../environments/environment';
import { IcamsworktimelogResponse } from '../model/camsworktimelog.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class camsworktimelogService {
  formData: camsworktimelog;
  readonly rootURL = AppConstants.baseURL;
  list: camsworktimelog[];
  camsworkreadings: camsworkreading[]=[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatecamsworktimelogs():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
      camsworkreadings: this.camsworkreadings.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
    };
    return this.http.post(AppConstants.ntirecamsURL + '/camsworktimelog', body);
  }
  }

  saveOrUpdatecamsworktimelogsList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntirecamsURL + '/camsworktimelog', body);
  }
  }

  getcamsworktimelogsList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecamsURL + '/camsworktimelog').toPromise();
  }
  }
  getListBylogid(logid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecamsURL + '/camsworktimelog'+'/logid/'+logid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecamsURL + '/camsworktimelog'+'/param/'+key).toPromise();
  }
  }


  getcamsworktimelogsByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecamsURL + '/camsworktimelog'+'/e/'+id).toPromise();
  }
  }
  getcamsworktimelogsByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecamsURL + '/camsworktimelog'+'/'+id).toPromise();
  }
  }

  deletecamsworktimelog(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntirecamsURL + '/camsworktimelog'+'/'+id).toPromise();
  }
  }
clearList(){
this.camsworkreadings = [];
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntirecamsURL + '/camsworktimelog')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

