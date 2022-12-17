import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { boworkflowstep } from '../model/boworkflowstep.model';
import { environment } from '../../environments/environment';
import { IboworkflowstepResponse } from '../model/boworkflowstep.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../shared/helper'
import { SessionService } from '../pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class boworkflowstepService {
  formData: boworkflowstep;
  readonly rootURL = AppConstants.baseURL;
  list: boworkflowstep[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdateboworkflowsteps():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntireboURL + '/boworkflowstep', body);
  }
  }

  saveOrUpdateboworkflowstepsList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntireboURL + '/boworkflowstep', body);
  }
  }

  getboworkflowstepsList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/boworkflowstep').toPromise();
  }
  }
  getListByworkflowstepid(workflowstepid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/boworkflowstep'+'/workflowstepid/'+workflowstepid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/boworkflowstep'+'/param/'+key).toPromise();
  }
  }


  getboworkflowstepsByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/boworkflowstep'+'/e/'+id).toPromise();
  }
  }
  getboworkflowstepsByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/boworkflowstep'+'/'+id).toPromise();
  }
  }

  deleteboworkflowstep(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntireboURL + '/boworkflowstep'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntireboURL + '/boworkflowstep')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

