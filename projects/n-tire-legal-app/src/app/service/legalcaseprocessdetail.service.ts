import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { legalcaseprocessdetail } from '../model/legalcaseprocessdetail.model';
import { boexpense } from '../../../../n-tire-bo-app/src/app/model/boexpense.model';
import { environment } from '../../environments/environment';
import { IlegalcaseprocessdetailResponse } from '../model/legalcaseprocessdetail.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class legalcaseprocessdetailService {
  formData: legalcaseprocessdetail;
  readonly rootURL = AppConstants.baseURL;
  list: legalcaseprocessdetail[];
  boexpenses: boexpense[]=[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatelegalcaseprocessdetails():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
      boexpenses: this.boexpenses.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
    };
    return this.http.post(AppConstants.ntirelegalURL + '/legalcaseprocessdetail', body);
  }
  }

  saveOrUpdatelegalcaseprocessdetailsList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntirelegalURL + '/legalcaseprocessdetail', body);
  }
  }

  getlegalcaseprocessdetailsList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirelegalURL + '/legalcaseprocessdetail').toPromise();
  }
  }
  getListBycaseprocessid(caseprocessid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirelegalURL + '/legalcaseprocessdetail'+'/caseprocessid/'+caseprocessid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirelegalURL + '/legalcaseprocessdetail'+'/param/'+key).toPromise();
  }
  }


  getlegalcaseprocessdetailsByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirelegalURL + '/legalcaseprocessdetail'+'/e/'+id).toPromise();
  }
  }
  getlegalcaseprocessdetailsByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirelegalURL + '/legalcaseprocessdetail'+'/'+id).toPromise();
  }
  }

  deletelegalcaseprocessdetail(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntirelegalURL + '/legalcaseprocessdetail'+'/'+id).toPromise();
  }
  }
clearList(){
this.boexpenses = [];
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntirelegalURL + '/legalcaseprocessdetail')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

