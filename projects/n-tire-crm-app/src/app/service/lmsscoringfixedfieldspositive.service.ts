import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lmsscoringfixedfieldspositive } from '../model/lmsscoringfixedfieldspositive.model';
import { environment } from '../../environments/environment';
import { IlmsscoringfixedfieldspositiveResponse } from '../model/lmsscoringfixedfieldspositive.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class lmsscoringfixedfieldspositiveService {
  formData: lmsscoringfixedfieldspositive;
  readonly rootURL = AppConstants.baseURL;
  list: lmsscoringfixedfieldspositive[];
DeletedlmsscoringfixedfieldspositiveIDs:string="";

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatelmsscoringfixedfieldspositives():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntirecrmURL + '/lmsscoringfixedfieldspositive', body);
  }
  }

  saveOrUpdatelmsscoringfixedfieldspositivesList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
DeletedlmsscoringfixedfieldspositiveIDs:this.DeletedlmsscoringfixedfieldspositiveIDs,    };
    return this.http.post(AppConstants.ntirecrmURL + '/lmsscoringfixedfieldspositive', body);
  }
  }

  getlmsscoringfixedfieldspositivesList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecrmURL + '/lmsscoringfixedfieldspositive').toPromise();
  }
  }
  getListBylsfpid(lsfpid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecrmURL + '/lmsscoringfixedfieldspositive'+'/lsfpid/'+lsfpid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecrmURL + '/lmsscoringfixedfieldspositive'+'/param/'+key).toPromise();
  }
  }


  getlmsscoringfixedfieldspositivesByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecrmURL + '/lmsscoringfixedfieldspositive'+'/e/'+id).toPromise();
  }
  }
  getlmsscoringfixedfieldspositivesByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecrmURL + '/lmsscoringfixedfieldspositive'+'/'+id).toPromise();
  }
  }

  deletelmsscoringfixedfieldspositive(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntirecrmURL + '/lmsscoringfixedfieldspositive'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntirecrmURL + '/lmsscoringfixedfieldspositive')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

