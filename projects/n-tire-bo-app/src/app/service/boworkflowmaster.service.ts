import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { boworkflowmaster } from '../model/boworkflowmaster.model';
import { boworkflow } from '../model/boworkflow.model';
import { boworkflowstep } from '../model/boworkflowstep.model';
import { environment } from '../../environments/environment';
import { IboworkflowmasterResponse } from '../model/boworkflowmaster.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../shared/helper'
import { SessionService } from '../pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class boworkflowmasterService {
  formData: boworkflowmaster;
  readonly rootURL = AppConstants.baseURL;
  list: boworkflowmaster[];
  boworkflows: boworkflow[]=[];
  boworkflowsteps: boworkflowstep[]=[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdateboworkflowmasters():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
      boworkflows: this.boworkflows.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
      boworkflowsteps: this.boworkflowsteps.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
    };
    return this.http.post(AppConstants.ntireboURL + '/boworkflowmaster', body);
  }
  }

  saveOrUpdateboworkflowmastersList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntireboURL + '/boworkflowmaster', body);
  }
  }

  getboworkflowmastersList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/boworkflowmaster').toPromise();
  }
  }
  getListByworkflowmasterid(workflowmasterid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/boworkflowmaster'+'/workflowmasterid/'+workflowmasterid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/boworkflowmaster'+'/param/'+key).toPromise();
  }
  }


  getboworkflowmastersByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/boworkflowmaster'+'/e/'+id).toPromise();
  }
  }
  getboworkflowmastersByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/boworkflowmaster'+'/'+id).toPromise();
  }
  }

  deleteboworkflowmaster(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntireboURL + '/boworkflowmaster'+'/'+id).toPromise();
  }
  }
clearList(){
this.boworkflows = [];
this.boworkflowsteps = [];
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntireboURL + '/boworkflowmaster')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

