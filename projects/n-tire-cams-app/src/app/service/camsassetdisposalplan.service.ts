import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { camsassetdisposalplan } from '../model/camsassetdisposalplan.model';
import { camsassetdisposal } from '../model/camsassetdisposal.model';
import { environment } from '../../environments/environment';
import { IcamsassetdisposalplanResponse } from '../model/camsassetdisposalplan.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class camsassetdisposalplanService {
  formData: camsassetdisposalplan;
  readonly rootURL = AppConstants.baseURL;
  list: camsassetdisposalplan[];
  camsassetdisposals: camsassetdisposal[]=[];

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
    return this.http.post(AppConstants.ntirecamsURL + '/camsassetdisposalplan', body);
  }
  }

  saveOrUpdatecamsassetdisposalplansList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntirecamsURL + '/camsassetdisposalplan', body);
  }
  }

  getcamsassetdisposalplansList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecamsURL + '/camsassetdisposalplan').toPromise();
  }
  }
  getListBydisposalplanid(disposalplanid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecamsURL + '/camsassetdisposalplan'+'/disposalplanid/'+disposalplanid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecamsURL + '/camsassetdisposalplan'+'/param/'+key).toPromise();
  }
  }


  getcamsassetdisposalplansByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecamsURL + '/camsassetdisposalplan'+'/e/'+id).toPromise();
  }
  }
  getcamsassetdisposalplansByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecamsURL + '/camsassetdisposalplan'+'/'+id).toPromise();
  }
  }

  deletecamsassetdisposalplan(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntirecamsURL + '/camsassetdisposalplan'+'/'+id).toPromise();
  }
  }
clearList(){
this.camsassetdisposals = [];
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntirecamsURL + '/camsassetdisposalplan')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

