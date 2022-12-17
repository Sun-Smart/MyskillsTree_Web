import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lmscampaignlocation } from '../model/lmscampaignlocation.model';
import { environment } from '../../environments/environment';
import { IlmscampaignlocationResponse } from '../model/lmscampaignlocation.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class lmscampaignlocationService {
  formData: lmscampaignlocation;
  readonly rootURL = AppConstants.baseURL;
  list: lmscampaignlocation[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatelmscampaignlocations():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntirecrmURL + '/lmscampaignlocation', body);
  }
  }

  saveOrUpdatelmscampaignlocationsList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntirecrmURL + '/lmscampaignlocation', body);
  }
  }

  getlmscampaignlocationsList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecrmURL + '/lmscampaignlocation').toPromise();
  }
  }
  getListBylocationid(locationid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecrmURL + '/lmscampaignlocation'+'/locationid/'+locationid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecrmURL + '/lmscampaignlocation'+'/param/'+key).toPromise();
  }
  }


  getlmscampaignlocationsByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecrmURL + '/lmscampaignlocation'+'/e/'+id).toPromise();
  }
  }
  getlmscampaignlocationsByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecrmURL + '/lmscampaignlocation'+'/'+id).toPromise();
  }
  }

  deletelmscampaignlocation(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntirecrmURL + '/lmscampaignlocation'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntirecrmURL + '/lmscampaignlocation')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

