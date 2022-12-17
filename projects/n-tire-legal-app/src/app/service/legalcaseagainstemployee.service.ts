import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { legalcaseagainstemployee } from '../model/legalcaseagainstemployee.model';
import { environment } from '../../environments/environment';
import { IlegalcaseagainstemployeeResponse } from '../model/legalcaseagainstemployee.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class legalcaseagainstemployeeService {
  formData: legalcaseagainstemployee;
  readonly rootURL = AppConstants.baseURL;
  list: legalcaseagainstemployee[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatelegalcaseagainstemployees():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntirelegalURL + '/legalcaseagainstemployee', body);
  }
  }

  saveOrUpdatelegalcaseagainstemployeesList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntirelegalURL + '/legalcaseagainstemployee', body);
  }
  }

  getlegalcaseagainstemployeesList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirelegalURL + '/legalcaseagainstemployee').toPromise();
  }
  }
  getListBycaseagainstid(caseagainstid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirelegalURL + '/legalcaseagainstemployee'+'/caseagainstid/'+caseagainstid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirelegalURL + '/legalcaseagainstemployee'+'/param/'+key).toPromise();
  }
  }


  getlegalcaseagainstemployeesByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirelegalURL + '/legalcaseagainstemployee'+'/e/'+id).toPromise();
  }
  }
  getlegalcaseagainstemployeesByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirelegalURL + '/legalcaseagainstemployee'+'/'+id).toPromise();
  }
  }

  deletelegalcaseagainstemployee(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntirelegalURL + '/legalcaseagainstemployee'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntirelegalURL + '/legalcaseagainstemployee')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

