import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { camsassetdisposal } from '../model/camsassetdisposal.model';
import { environment } from '../../environments/environment';
import { IcamsassetdisposalResponse } from '../model/camsassetdisposal.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class camsassetdisposalService {
  formData: camsassetdisposal;
  readonly rootURL = AppConstants.baseURL;
  list: camsassetdisposal[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatecamsassetdisposals():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntirecamsURL + '/camsassetdisposal', body);
  }
  }

  saveOrUpdatecamsassetdisposalsList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntirecamsURL + '/camsassetdisposal', body);
  }
  }

  getcamsassetdisposalsList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecamsURL + '/camsassetdisposal').toPromise();
  }
  }
  getListBydisposalid(disposalid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecamsURL + '/camsassetdisposal'+'/disposalid/'+disposalid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecamsURL + '/camsassetdisposal'+'/param/'+key).toPromise();
  }
  }


  getcamsassetdisposalsByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecamsURL + '/camsassetdisposal'+'/e/'+id).toPromise();
  }
  }
  getcamsassetdisposalsByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecamsURL + '/camsassetdisposal'+'/'+id).toPromise();
  }
  }

  deletecamsassetdisposal(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntirecamsURL + '/camsassetdisposal'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntirecamsURL + '/camsassetdisposal')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

