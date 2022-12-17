import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { boprocesstask } from '../model/boprocesstask.model';
import { boprocesstaskform } from '../model/boprocesstaskform.model';
import { environment } from '../../environments/environment';
import { IboprocesstaskResponse } from '../model/boprocesstask.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../shared/helper'
import { SessionService } from '../pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class boprocesstaskService {
  formData: boprocesstask;
  readonly rootURL = AppConstants.baseURL;
  boprocesstaskforms: boprocesstaskform[]=[];
  list: boprocesstask[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdateboprocesstasks():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
      boprocesstaskforms: this.boprocesstaskforms.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
    };
    return this.http.post(AppConstants.ntireboURL + '/boprocesstask', body);
  }
  }

  saveOrUpdateboprocesstasksList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntireboURL + '/boprocesstask', body);
  }
  }

  getboprocesstasksList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/boprocesstask').toPromise();
  }
  }
  getListBytaskprocessid(taskprocessid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/boprocesstask'+'/taskprocessid/'+taskprocessid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/boprocesstask'+'/param/'+key).toPromise();
  }
  }


  getboprocesstasksByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/boprocesstask'+'/e/'+id).toPromise();
  }
  }
  getboprocesstasksByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/boprocesstask'+'/'+id).toPromise();
  }
  }

  deleteboprocesstask(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntireboURL + '/boprocesstask'+'/'+id).toPromise();
  }
  }
clearList(){
this.boprocesstaskforms = [];
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntireboURL + '/boprocesstask')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

