import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { prjprojectrequirement } from '../model/prjprojectrequirement.model';
import { environment } from '../../environments/environment';
import { IprjprojectrequirementResponse } from '../model/prjprojectrequirement.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class prjprojectrequirementService {
  formData: prjprojectrequirement;
  readonly rootURL = AppConstants.baseURL;
  list: prjprojectrequirement[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdateprjprojectrequirements():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntireprojectURL + '/prjprojectrequirement', body);
  }
  }

  saveOrUpdateprjprojectrequirementsList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntireprojectURL + '/prjprojectrequirement', body);
  }
  }

  getprjprojectrequirementsList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprojectURL + '/prjprojectrequirement').toPromise();
  }
  }
  getListByrequirementid(requirementid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprojectURL + '/prjprojectrequirement'+'/requirementid/'+requirementid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprojectURL + '/prjprojectrequirement'+'/param/'+key).toPromise();
  }
  }


  getprjprojectrequirementsByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprojectURL + '/prjprojectrequirement'+'/e/'+id).toPromise();
  }
  }
  getprjprojectrequirementsByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprojectURL + '/prjprojectrequirement'+'/'+id).toPromise();
  }
  }

  deleteprjprojectrequirement(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntireprojectURL + '/prjprojectrequirement'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntireprojectURL + '/prjprojectrequirement')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

