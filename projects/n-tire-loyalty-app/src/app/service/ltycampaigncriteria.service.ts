import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ltycampaigncriteria } from '../model/ltycampaigncriteria.model';
import { environment } from '../../environments/environment';
import { IltycampaigncriteriaResponse } from '../model/ltycampaigncriteria.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class ltycampaigncriteriaService {
  formData: ltycampaigncriteria;
  readonly rootURL = AppConstants.baseURL;
  list: ltycampaigncriteria[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdateltycampaigncriterias():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntireloyaltyURL + '/ltycampaigncriteria', body);
  }
  }

  saveOrUpdateltycampaigncriteriasList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntireloyaltyURL + '/ltycampaigncriteria', body);
  }
  }

  getltycampaigncriteriasList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireloyaltyURL + '/ltycampaigncriteria').toPromise();
  }
  }
  getListBydetailid(detailid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireloyaltyURL + '/ltycampaigncriteria'+'/detailid/'+detailid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireloyaltyURL + '/ltycampaigncriteria'+'/param/'+key).toPromise();
  }
  }


  getltycampaigncriteriasByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireloyaltyURL + '/ltycampaigncriteria'+'/e/'+id).toPromise();
  }
  }
  getltycampaigncriteriasByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireloyaltyURL + '/ltycampaigncriteria'+'/'+id).toPromise();
  }
  }

  deleteltycampaigncriteria(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntireloyaltyURL + '/ltycampaigncriteria'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntireloyaltyURL + '/ltycampaigncriteria')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

