import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lmsscoringplannedclosedate } from '../model/lmsscoringplannedclosedate.model';
import { environment } from '../../environments/environment';
import { IlmsscoringplannedclosedateResponse } from '../model/lmsscoringplannedclosedate.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class lmsscoringplannedclosedateService {
  formData: lmsscoringplannedclosedate;
  readonly rootURL = AppConstants.baseURL;
  list: lmsscoringplannedclosedate[];
DeletedlmsscoringplannedclosedateIDs:string="";

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatelmsscoringplannedclosedates():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntirecrmURL + '/lmsscoringplannedclosedate', body);
  }
  }

  saveOrUpdatelmsscoringplannedclosedatesList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
DeletedlmsscoringplannedclosedateIDs:this.DeletedlmsscoringplannedclosedateIDs,    };
    return this.http.post(AppConstants.ntirecrmURL + '/lmsscoringplannedclosedate', body);
  }
  }

  getlmsscoringplannedclosedatesList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecrmURL + '/lmsscoringplannedclosedate').toPromise();
  }
  }
  getListBylspcid(lspcid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecrmURL + '/lmsscoringplannedclosedate'+'/lspcid/'+lspcid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecrmURL + '/lmsscoringplannedclosedate'+'/param/'+key).toPromise();
  }
  }


  getlmsscoringplannedclosedatesByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecrmURL + '/lmsscoringplannedclosedate'+'/e/'+id).toPromise();
  }
  }
  getlmsscoringplannedclosedatesByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecrmURL + '/lmsscoringplannedclosedate'+'/'+id).toPromise();
  }
  }

  deletelmsscoringplannedclosedate(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntirecrmURL + '/lmsscoringplannedclosedate'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntirecrmURL + '/lmsscoringplannedclosedate')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

