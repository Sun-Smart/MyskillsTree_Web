import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ltycampaign } from '../model/ltycampaign.model';
import { ltycustomerreward } from '../model/ltycustomerreward.model';
import { ltycampaigncriteria } from '../model/ltycampaigncriteria.model';
import { environment } from '../../environments/environment';
import { IltycampaignResponse } from '../model/ltycampaign.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class ltycampaignService {
  formData: ltycampaign;
  readonly rootURL = AppConstants.baseURL;
  list: ltycampaign[];
  ltycustomerrewards: ltycustomerreward[]=[];
  ltycampaigncriterias: ltycampaigncriteria[]=[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdateltycampaigns():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
      ltycustomerrewards: this.ltycustomerrewards.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
      ltycampaigncriterias: this.ltycampaigncriterias.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
    };
    return this.http.post(AppConstants.ntireloyaltyURL + '/ltycampaign', body);
  }
  }

  saveOrUpdateltycampaignsList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntireloyaltyURL + '/ltycampaign', body);
  }
  }

  getltycampaignsList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireloyaltyURL + '/ltycampaign').toPromise();
  }
  }
  getListBycampaignid(campaignid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireloyaltyURL + '/ltycampaign'+'/campaignid/'+campaignid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireloyaltyURL + '/ltycampaign'+'/param/'+key).toPromise();
  }
  }


  getltycampaignsByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireloyaltyURL + '/ltycampaign'+'/e/'+id).toPromise();
  }
  }
  getltycampaignsByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireloyaltyURL + '/ltycampaign'+'/'+id).toPromise();
  }
  }

  deleteltycampaign(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntireloyaltyURL + '/ltycampaign'+'/'+id).toPromise();
  }
  }
clearList(){
this.ltycustomerrewards = [];
this.ltycampaigncriterias = [];
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntireloyaltyURL + '/ltycampaign')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

