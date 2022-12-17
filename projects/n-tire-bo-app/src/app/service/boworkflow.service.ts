import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { boworkflow } from '../model/boworkflow.model';
import { environment } from '../../environments/environment';
import { IboworkflowResponse } from '../model/boworkflow.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../shared/helper'
import { SessionService } from '../pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class boworkflowService {
  formData: boworkflow;
  readonly rootURL = AppConstants.baseURL;
  list: boworkflow[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdateboworkflows():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntireboURL + '/boworkflow', body);
  }
  }

  saveOrUpdateboworkflowsList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntireboURL + '/boworkflow', body);
  }
  }

  getboworkflowsList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/boworkflow').toPromise();
  }
  }
  getListByworkflowid(workflowid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/boworkflow'+'/workflowid/'+workflowid).toPromise();
  }
  }

  getListBypkvalue(pkvalue:number,modulename:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/boworkflow'+'/pkvalue/'+pkvalue+'/'+modulename).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/boworkflow'+'/param/'+key).toPromise();
  }
  }


  getboworkflowsByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/boworkflow'+'/e/'+id).toPromise();
  }
  }
  getboworkflowsByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/boworkflow'+'/'+id).toPromise();
  }
  }

  deleteboworkflow(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntireboURL + '/boworkflow'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntireboURL + '/boworkflow')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

