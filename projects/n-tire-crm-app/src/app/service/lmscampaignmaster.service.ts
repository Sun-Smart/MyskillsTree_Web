import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lmscampaignmaster } from '../model/lmscampaignmaster.model';
import { lmscampaigntask } from '../model/lmscampaigntask.model';
import { lmscampaignlocation } from '../model/lmscampaignlocation.model';
import { lmscampaignnoaccess } from '../model/lmscampaignnoaccess.model';
import { lmspost } from '../model/lmspost.model';
import { environment } from '../../environments/environment';
import { IlmscampaignmasterResponse } from '../model/lmscampaignmaster.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class lmscampaignmasterService {
  formData: lmscampaignmaster;
  readonly rootURL = AppConstants.baseURL;
  list: lmscampaignmaster[];
  lmscampaigntasks: lmscampaigntask[]=[];
  lmscampaignlocations: lmscampaignlocation[]=[];
  lmscampaignnoaccesses: lmscampaignnoaccess[]=[];
  Insertlmscampaignnoaccesses: lmscampaignnoaccess[]=[];
  lmsposts: lmspost[]=[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatelmscampaignmasters():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
      lmscampaigntasks: this.lmscampaigntasks.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
      lmscampaignlocations: this.lmscampaignlocations.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
      lmscampaignnoaccesses: this.Insertlmscampaignnoaccesses.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
      lmsposts: this.lmsposts.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
    };
    return this.http.post(AppConstants.ntirecrmURL + '/lmscampaignmaster', body);
  }
  }

  saveOrUpdatelmscampaignmastersList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntirecrmURL + '/lmscampaignmaster', body);
  }
  }

  getlmscampaignmastersList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecrmURL + '/lmscampaignmaster').toPromise();
  }
  }
  getListBycampaignid(campaignid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecrmURL + '/lmscampaignmaster'+'/campaignid/'+campaignid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecrmURL + '/lmscampaignmaster'+'/param/'+key).toPromise();
  }
  }


  getlmscampaignmastersByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecrmURL + '/lmscampaignmaster'+'/e/'+id).toPromise();
  }
  }
  getlmscampaignmastersByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecrmURL + '/lmscampaignmaster'+'/'+id).toPromise();
  }
  }

  deletelmscampaignmaster(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntirecrmURL + '/lmscampaignmaster'+'/'+id).toPromise();
  }
  }
clearList(){
this.lmscampaigntasks = [];
this.lmscampaignlocations = [];
this.lmscampaignnoaccesses = [];
this.lmsposts = [];
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntirecrmURL + '/lmscampaignmaster')
.toPromise()
.then(res => this.list = res as any[]);
}
}



}

