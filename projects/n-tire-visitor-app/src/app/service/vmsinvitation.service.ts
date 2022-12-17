import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { vmsinvitation } from '../model/vmsinvitation.model';
import { vmsinviteperson } from '../model/vmsinviteperson.model';
import { environment } from '../../environments/environment';
import { IvmsinvitationResponse } from '../model/vmsinvitation.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class vmsinvitationService {
  formData: vmsinvitation;
  readonly rootURL = AppConstants.baseURL;
  list: vmsinvitation[];
  vmsinvitepersons: vmsinviteperson[]=[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatevmsinvitations():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
      vmsinvitepersons: this.vmsinvitepersons.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
    };
    return this.http.post(AppConstants.ntirevisitorURL + '/vmsinvitation', body);
  }
  }

  saveOrUpdatevmsinvitationsList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntirevisitorURL + '/vmsinvitation', body);
  }
  }

  getvmsinvitationsList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirevisitorURL + '/vmsinvitation').toPromise();
  }
  }
  getListByinvitationid(invitationid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirevisitorURL + '/vmsinvitation'+'/invitationid/'+invitationid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirevisitorURL + '/vmsinvitation'+'/param/'+key).toPromise();
  }
  }


  getvmsinvitationsByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirevisitorURL + '/vmsinvitation'+'/e/'+id).toPromise();
  }
  }
  getvmsinvitationsByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirevisitorURL + '/vmsinvitation'+'/'+id).toPromise();
  }
  }

  deletevmsinvitation(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntirevisitorURL + '/vmsinvitation'+'/'+id).toPromise();
  }
  }
clearList(){
this.vmsinvitepersons = [];
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntirevisitorURL + '/vmsinvitation')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

