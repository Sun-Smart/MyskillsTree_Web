import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { hrmsemployeeleaveledger } from '../model/hrmsemployeeleaveledger.model';
import { environment } from '../../environments/environment';
import { IhrmsemployeeleaveledgerResponse } from '../model/hrmsemployeeleaveledger.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class hrmsemployeeleaveledgerService {
  formData: hrmsemployeeleaveledger;
  readonly rootURL = AppConstants.baseURL;
  list: hrmsemployeeleaveledger[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatehrmsemployeeleaveledgers():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntirehrmsURL + '/hrmsemployeeleaveledger', body);
  }
  }

  saveOrUpdatehrmsemployeeleaveledgersList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntirehrmsURL + '/hrmsemployeeleaveledger', body);
  }
  }

  gethrmsemployeeleaveledgersList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeeleaveledger').toPromise();
  }
  }
  getListByledgerid(ledgerid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeeleaveledger'+'/ledgerid/'+ledgerid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeeleaveledger'+'/param/'+key).toPromise();
  }
  }


  gethrmsemployeeleaveledgersByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeeleaveledger'+'/e/'+id).toPromise();
  }
  }
  gethrmsemployeeleaveledgersByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeeleaveledger'+'/'+id).toPromise();
  }
  }

  deletehrmsemployeeleaveledger(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntirehrmsURL + '/hrmsemployeeleaveledger'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeeleaveledger')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

