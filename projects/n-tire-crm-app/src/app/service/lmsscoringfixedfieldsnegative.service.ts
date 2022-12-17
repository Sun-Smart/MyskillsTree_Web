import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lmsscoringfixedfieldsnegative } from '../model/lmsscoringfixedfieldsnegative.model';
import { environment } from '../../environments/environment';
import { IlmsscoringfixedfieldsnegativeResponse } from '../model/lmsscoringfixedfieldsnegative.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class lmsscoringfixedfieldsnegativeService {
  formData: lmsscoringfixedfieldsnegative;
  readonly rootURL = AppConstants.baseURL;
  list: lmsscoringfixedfieldsnegative[];
DeletedlmsscoringfixedfieldsnegativeIDs:string="";

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatelmsscoringfixedfieldsnegatives():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntirecrmURL + '/lmsscoringfixedfieldsnegative', body);
  }
  }

  saveOrUpdatelmsscoringfixedfieldsnegativesList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
DeletedlmsscoringfixedfieldsnegativeIDs:this.DeletedlmsscoringfixedfieldsnegativeIDs,    };
    return this.http.post(AppConstants.ntirecrmURL + '/lmsscoringfixedfieldsnegative', body);
  }
  }

  getlmsscoringfixedfieldsnegativesList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecrmURL + '/lmsscoringfixedfieldsnegative').toPromise();
  }
  }
  getListBylsfnid(lsfnid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecrmURL + '/lmsscoringfixedfieldsnegative'+'/lsfnid/'+lsfnid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecrmURL + '/lmsscoringfixedfieldsnegative'+'/param/'+key).toPromise();
  }
  }


  getlmsscoringfixedfieldsnegativesByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecrmURL + '/lmsscoringfixedfieldsnegative'+'/e/'+id).toPromise();
  }
  }
  getlmsscoringfixedfieldsnegativesByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecrmURL + '/lmsscoringfixedfieldsnegative'+'/'+id).toPromise();
  }
  }

  deletelmsscoringfixedfieldsnegative(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntirecrmURL + '/lmsscoringfixedfieldsnegative'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntirecrmURL + '/lmsscoringfixedfieldsnegative')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

