import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { botask } from '../model/botask.model';
import { botaskresponse } from '../model/botaskresponse.model';
import { environment } from '../../environments/environment';
import { IbotaskResponse } from '../model/botask.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../shared/helper'
import { SessionService } from '../pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class botaskService {
  formData: botask;
  readonly rootURL = AppConstants.baseURL;
  botaskresponses: botaskresponse[]=[];
  list: botask[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatebotasks():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
      botaskresponses: this.botaskresponses.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
    };
    return this.http.post(AppConstants.ntireboURL + '/botask', body);
  }
  }

  saveOrUpdatebotasksList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntireboURL + '/botask', body);
  }
  }

  getbotasksList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/botask').toPromise();
  }
  }
  getListBytaskid(taskid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/botask'+'/taskid/'+taskid).toPromise();
  }
  }

  getListBysourcereference(sourcereference:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/botask'+'/sourcereference/'+sourcereference).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/botask'+'/param/'+key).toPromise();
  }
  }


  getbotasksByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/botask'+'/e/'+id).toPromise();
  }
  }
  getbotasksByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/botask'+'/'+id).toPromise();
  }
  }

  deletebotask(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntireboURL + '/botask'+'/'+id).toPromise();
  }
  }
clearList(){
this.botaskresponses = [];
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntireboURL + '/botask')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

