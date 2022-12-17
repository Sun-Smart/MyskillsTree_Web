import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lmscampaigntask } from '../model/lmscampaigntask.model';
import { lmscampaigntaskresponse } from '../model/lmscampaigntaskresponse.model';
import { environment } from '../../environments/environment';
import { IlmscampaigntaskResponse } from '../model/lmscampaigntask.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class lmscampaigntaskService {
  formData: lmscampaigntask;
  readonly rootURL = AppConstants.baseURL;
  list: lmscampaigntask[];
  lmscampaigntaskresponses: lmscampaigntaskresponse[]=[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatelmscampaigntasks():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
      lmscampaigntaskresponses: this.lmscampaigntaskresponses.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
    };
    return this.http.post(AppConstants.ntirecrmURL + '/lmscampaigntask', body);
  }
  }

  saveOrUpdatelmscampaigntasksList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntirecrmURL + '/lmscampaigntask', body);
  }
  }

  getlmscampaigntasksList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecrmURL + '/lmscampaigntask').toPromise();
  }
  }
  getListBytaskid(taskid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecrmURL + '/lmscampaigntask'+'/taskid/'+taskid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecrmURL + '/lmscampaigntask'+'/param/'+key).toPromise();
  }
  }


  getlmscampaigntasksByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecrmURL + '/lmscampaigntask'+'/e/'+id).toPromise();
  }
  }
  getlmscampaigntasksByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecrmURL + '/lmscampaigntask'+'/'+id).toPromise();
  }
  }

  deletelmscampaigntask(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntirecrmURL + '/lmscampaigntask'+'/'+id).toPromise();
  }
  }
clearList(){
this.lmscampaigntaskresponses = [];
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntirecrmURL + '/lmscampaigntask')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

