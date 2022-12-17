import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { hrmsodclaim } from '../model/hrmsodclaim.model';
import { environment } from '../../environments/environment';
import { IhrmsodclaimResponse } from '../model/hrmsodclaim.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class hrmsodclaimService {
  formData: hrmsodclaim;
  readonly rootURL = AppConstants.baseURL;
  list: hrmsodclaim[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatehrmsodclaims():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntirehrmsURL + '/hrmsodclaim', body);
  }
  }

  saveOrUpdatehrmsodclaimsList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntirehrmsURL + '/hrmsodclaim', body);
  }
  }

  gethrmsodclaimsList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsodclaim').toPromise();
  }
  }
  getListByclaimid(claimid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsodclaim'+'/claimid/'+claimid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsodclaim'+'/param/'+key).toPromise();
  }
  }


  gethrmsodclaimsByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsodclaim'+'/e/'+id).toPromise();
  }
  }
  gethrmsodclaimsByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsodclaim'+'/'+id).toPromise();
  }
  }

  deletehrmsodclaim(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntirehrmsURL + '/hrmsodclaim'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntirehrmsURL + '/hrmsodclaim')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

