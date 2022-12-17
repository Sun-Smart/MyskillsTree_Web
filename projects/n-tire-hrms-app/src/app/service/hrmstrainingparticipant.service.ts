import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { hrmstrainingparticipant } from '../model/hrmstrainingparticipant.model';
import { environment } from '../../environments/environment';
import { IhrmstrainingparticipantResponse } from '../model/hrmstrainingparticipant.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class hrmstrainingparticipantService {
  formData: hrmstrainingparticipant;
  readonly rootURL = AppConstants.baseURL;
  list: hrmstrainingparticipant[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatehrmstrainingparticipants():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntirehrmsURL + '/hrmstrainingparticipant', body);
  }
  }

  saveOrUpdatehrmstrainingparticipantsList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntirehrmsURL + '/hrmstrainingparticipant', body);
  }
  }

  gethrmstrainingparticipantsList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmstrainingparticipant').toPromise();
  }
  }
  getListByparticipantid(participantid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmstrainingparticipant'+'/participantid/'+participantid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmstrainingparticipant'+'/param/'+key).toPromise();
  }
  }


  gethrmstrainingparticipantsByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmstrainingparticipant'+'/e/'+id).toPromise();
  }
  }
  gethrmstrainingparticipantsByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmstrainingparticipant'+'/'+id).toPromise();
  }
  }

  deletehrmstrainingparticipant(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntirehrmsURL + '/hrmstrainingparticipant'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntirehrmsURL + '/hrmstrainingparticipant')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

