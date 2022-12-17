import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { hrmstrainingmaster } from '../model/hrmstrainingmaster.model';
import { hrmstrainingattendance } from '../model/hrmstrainingattendance.model';
import { hrmstrainingfeedbacktrainee } from '../model/hrmstrainingfeedbacktrainee.model';
import { hrmstrainingfeedbacktrainer } from '../model/hrmstrainingfeedbacktrainer.model';
import { hrmstrainingparticipant } from '../model/hrmstrainingparticipant.model';
import { hrmstrainingschedule } from '../model/hrmstrainingschedule.model';
import { environment } from '../../environments/environment';
import { IhrmstrainingmasterResponse } from '../model/hrmstrainingmaster.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class hrmstrainingmasterService {
  formData: hrmstrainingmaster;
  readonly rootURL = AppConstants.baseURL;
  list: hrmstrainingmaster[];
  hrmstrainingattendances: hrmstrainingattendance[]=[];
  hrmstrainingfeedbacktrainees: hrmstrainingfeedbacktrainee[]=[];
  hrmstrainingfeedbacktrainers: hrmstrainingfeedbacktrainer[]=[];
  hrmstrainingparticipants: hrmstrainingparticipant[]=[];
  hrmstrainingschedules: hrmstrainingschedule[]=[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatehrmstrainingmasters():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
      hrmstrainingattendances: this.hrmstrainingattendances.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
      hrmstrainingfeedbacktrainees: this.hrmstrainingfeedbacktrainees.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
      hrmstrainingfeedbacktrainers: this.hrmstrainingfeedbacktrainers.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
      hrmstrainingparticipants: this.hrmstrainingparticipants.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
      hrmstrainingschedules: this.hrmstrainingschedules.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
    };
    return this.http.post(AppConstants.ntirehrmsURL + '/hrmstrainingmaster', body);
  }
  }

  saveOrUpdatehrmstrainingmastersList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntirehrmsURL + '/hrmstrainingmaster', body);
  }
  }

  gethrmstrainingmastersList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmstrainingmaster').toPromise();
  }
  }
  getListBytrainingmasterid(trainingmasterid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmstrainingmaster'+'/trainingmasterid/'+trainingmasterid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmstrainingmaster'+'/param/'+key).toPromise();
  }
  }


  gethrmstrainingmastersByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmstrainingmaster'+'/e/'+id).toPromise();
  }
  }
  gethrmstrainingmastersByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmstrainingmaster'+'/'+id).toPromise();
  }
  }

  deletehrmstrainingmaster(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntirehrmsURL + '/hrmstrainingmaster'+'/'+id).toPromise();
  }
  }
clearList(){
this.hrmstrainingattendances = [];
this.hrmstrainingfeedbacktrainees = [];
this.hrmstrainingfeedbacktrainers = [];
this.hrmstrainingparticipants = [];
this.hrmstrainingschedules = [];
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntirehrmsURL + '/hrmstrainingmaster')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

