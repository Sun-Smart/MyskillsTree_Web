import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { legallawyercourt } from '../model/legallawyercourt.model';
import { environment } from '../../environments/environment';
import { IlegallawyercourtResponse } from '../model/legallawyercourt.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class legallawyercourtService {
  formData: legallawyercourt;
  readonly rootURL = AppConstants.baseURL;
  list: legallawyercourt[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatelegallawyercourts():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntirelegalURL + '/legallawyercourt', body);
  }
  }

  saveOrUpdatelegallawyercourtsList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntirelegalURL + '/legallawyercourt', body);
  }
  }

  getlegallawyercourtsList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirelegalURL + '/legallawyercourt').toPromise();
  }
  }
  getListBylawyercourtid(lawyercourtid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirelegalURL + '/legallawyercourt'+'/lawyercourtid/'+lawyercourtid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirelegalURL + '/legallawyercourt'+'/param/'+key).toPromise();
  }
  }


  getlegallawyercourtsByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirelegalURL + '/legallawyercourt'+'/e/'+id).toPromise();
  }
  }
  getlegallawyercourtsByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirelegalURL + '/legallawyercourt'+'/'+id).toPromise();
  }
  }

  deletelegallawyercourt(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntirelegalURL + '/legallawyercourt'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntirelegalURL + '/legallawyercourt')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

