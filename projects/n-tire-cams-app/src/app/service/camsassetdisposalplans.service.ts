import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { camsassetdisposalplans } from '../model/camsassetdisposalplans.model';
import { camsassetdisposal } from '../model/camsassetdisposal.model';
import { environment } from '../../environments/environment';
import { IcamsassetdisposalplansResponse } from '../model/camsassetdisposalplans.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class camsassetdisposalplansService {
  formData: camsassetdisposalplans;
  readonly rootURL = AppConstants.baseURL;
  camsassetdisposals: camsassetdisposal[]=[];
  list: camsassetdisposalplans[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatecamsassetdisposalplans():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
      camsassetdisposals: this.camsassetdisposals.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
    };
    return this.http.post(AppConstants.ntirecamsURL + '/camsassetdisposalplans', body);
  }
  }

  saveOrUpdatecamsassetdisposalplansList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntirecamsURL + '/camsassetdisposalplans', body);
  }
  }

  getcamsassetdisposalplansList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecamsURL + '/camsassetdisposalplans').toPromise();
  }
  }
  getListBydisposalplanid(disposalplanid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecamsURL + '/camsassetdisposalplans'+'/disposalplanid/'+disposalplanid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecamsURL + '/camsassetdisposalplans'+'/param/'+key).toPromise();
  }
  }


  getcamsassetdisposalplansByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecamsURL + '/camsassetdisposalplans'+'/e/'+id).toPromise();
  }
  }
  getcamsassetdisposalplansByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecamsURL + '/camsassetdisposalplans'+'/'+id).toPromise();
  }
  }

  deletecamsassetdisposalplans(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntirecamsURL + '/camsassetdisposalplans'+'/'+id).toPromise();
  }
  }
clearList(){
this.camsassetdisposals = [];
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntirecamsURL + '/camsassetdisposalplans')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

