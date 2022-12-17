import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { legalcourtprocessmaster } from '../model/legalcourtprocessmaster.model';
import { environment } from '../../environments/environment';
import { IlegalcourtprocessmasterResponse } from '../model/legalcourtprocessmaster.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class legalcourtprocessmasterService {
  formData: legalcourtprocessmaster;
  readonly rootURL = AppConstants.baseURL;
  list: legalcourtprocessmaster[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatelegalcourtprocessmasters():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntirelegalURL + '/legalcourtprocessmaster', body);
  }
  }

  saveOrUpdatelegalcourtprocessmastersList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntirelegalURL + '/legalcourtprocessmaster', body);
  }
  }

  getlegalcourtprocessmastersList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirelegalURL + '/legalcourtprocessmaster').toPromise();
  }
  }
  getListByprocessid(processid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirelegalURL + '/legalcourtprocessmaster'+'/processid/'+processid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirelegalURL + '/legalcourtprocessmaster'+'/param/'+key).toPromise();
  }
  }


  getlegalcourtprocessmastersByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirelegalURL + '/legalcourtprocessmaster'+'/e/'+id).toPromise();
  }
  }
  getlegalcourtprocessmastersByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirelegalURL + '/legalcourtprocessmaster'+'/'+id).toPromise();
  }
  }

  deletelegalcourtprocessmaster(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntirelegalURL + '/legalcourtprocessmaster'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntirelegalURL + '/legalcourtprocessmaster')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

