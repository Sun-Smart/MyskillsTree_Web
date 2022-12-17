import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { hlpplannedaction } from '../model/hlpplannedaction.model';
import { environment } from '../../environments/environment';
import { IhlpplannedactionResponse } from '../model/hlpplannedaction.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class hlpplannedactionService {
  formData: hlpplannedaction;
  readonly rootURL = AppConstants.baseURL;
  list: hlpplannedaction[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatehlpplannedactions():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntirehelpdeskURL + '/hlpplannedaction', body);
  }
  }

  saveOrUpdatehlpplannedactionsList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntirehelpdeskURL + '/hlpplannedaction', body);
  }
  }

  gethlpplannedactionsList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehelpdeskURL + '/hlpplannedaction').toPromise();
  }
  }
  getListByplanid(planid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehelpdeskURL + '/hlpplannedaction'+'/planid/'+planid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehelpdeskURL + '/hlpplannedaction'+'/param/'+key).toPromise();
  }
  }


  gethlpplannedactionsByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehelpdeskURL + '/hlpplannedaction'+'/e/'+id).toPromise();
  }
  }
  gethlpplannedactionsByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehelpdeskURL + '/hlpplannedaction'+'/'+id).toPromise();
  }
  }

  deletehlpplannedaction(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntirehelpdeskURL + '/hlpplannedaction'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntirehelpdeskURL + '/hlpplannedaction')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

