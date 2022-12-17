import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { legalopponentmaster } from '../model/legalopponentmaster.model';
import { environment } from '../../environments/environment';
import { IlegalopponentmasterResponse } from '../model/legalopponentmaster.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class legalopponentmasterService {
  formData: legalopponentmaster;
  readonly rootURL = AppConstants.baseURL;
  list: legalopponentmaster[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatelegalopponentmasters():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntirelegalURL + '/legalopponentmaster', body);
  }
  }

  saveOrUpdatelegalopponentmastersList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntirelegalURL + '/legalopponentmaster', body);
  }
  }

  getlegalopponentmastersList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirelegalURL + '/legalopponentmaster').toPromise();
  }
  }
  getListByopponentid(opponentid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirelegalURL + '/legalopponentmaster'+'/opponentid/'+opponentid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirelegalURL + '/legalopponentmaster'+'/param/'+key).toPromise();
  }
  }


  getlegalopponentmastersByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirelegalURL + '/legalopponentmaster'+'/e/'+id).toPromise();
  }
  }
  getlegalopponentmastersByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirelegalURL + '/legalopponentmaster'+'/'+id).toPromise();
  }
  }

  deletelegalopponentmaster(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntirelegalURL + '/legalopponentmaster'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntirelegalURL + '/legalopponentmaster')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

