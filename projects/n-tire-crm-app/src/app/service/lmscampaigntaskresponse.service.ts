import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lmscampaigntaskresponse } from '../model/lmscampaigntaskresponse.model';
import { environment } from '../../environments/environment';
import { IlmscampaigntaskresponseResponse } from '../model/lmscampaigntaskresponse.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class lmscampaigntaskresponseService {
  formData: lmscampaigntaskresponse;
  readonly rootURL = AppConstants.baseURL;
  list: lmscampaigntaskresponse[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatelmscampaigntaskresponses():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntirecrmURL + '/lmscampaigntaskresponse', body);
  }
  }

  saveOrUpdatelmscampaigntaskresponsesList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntirecrmURL + '/lmscampaigntaskresponse', body);
  }
  }

  getlmscampaigntaskresponsesList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecrmURL + '/lmscampaigntaskresponse').toPromise();
  }
  }
  getListByresponseid(responseid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecrmURL + '/lmscampaigntaskresponse'+'/responseid/'+responseid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecrmURL + '/lmscampaigntaskresponse'+'/param/'+key).toPromise();
  }
  }


  getlmscampaigntaskresponsesByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecrmURL + '/lmscampaigntaskresponse'+'/e/'+id).toPromise();
  }
  }
  getlmscampaigntaskresponsesByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecrmURL + '/lmscampaigntaskresponse'+'/'+id).toPromise();
  }
  }

  deletelmscampaigntaskresponse(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntirecrmURL + '/lmscampaigntaskresponse'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntirecrmURL + '/lmscampaigntaskresponse')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

