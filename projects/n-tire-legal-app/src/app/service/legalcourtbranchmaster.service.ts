import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { legalcourtbranchmaster } from '../model/legalcourtbranchmaster.model';
import { environment } from '../../environments/environment';
import { IlegalcourtbranchmasterResponse } from '../model/legalcourtbranchmaster.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class legalcourtbranchmasterService {
  formData: legalcourtbranchmaster;
  readonly rootURL = AppConstants.baseURL;
  list: legalcourtbranchmaster[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatelegalcourtbranchmasters():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntirelegalURL + '/legalcourtbranchmaster', body);
  }
  }

  saveOrUpdatelegalcourtbranchmastersList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntirelegalURL + '/legalcourtbranchmaster', body);
  }
  }

  getlegalcourtbranchmastersList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirelegalURL + '/legalcourtbranchmaster').toPromise();
  }
  }
  getListBycourtbranchid(courtbranchid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirelegalURL + '/legalcourtbranchmaster'+'/courtbranchid/'+courtbranchid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirelegalURL + '/legalcourtbranchmaster'+'/param/'+key).toPromise();
  }
  }


  getlegalcourtbranchmastersByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirelegalURL + '/legalcourtbranchmaster'+'/e/'+id).toPromise();
  }
  }
  getlegalcourtbranchmastersByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirelegalURL + '/legalcourtbranchmaster'+'/'+id).toPromise();
  }
  }

  deletelegalcourtbranchmaster(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntirelegalURL + '/legalcourtbranchmaster'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntirelegalURL + '/legalcourtbranchmaster')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

