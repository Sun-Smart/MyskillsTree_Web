import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { itlicenseagreement } from '../model/itlicenseagreement.model';
import { itlicense } from '../model/itlicense.model';
import { environment } from '../../environments/environment';
import { IitlicenseagreementResponse } from '../model/itlicenseagreement.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class itlicenseagreementService {
  formData: itlicenseagreement;
  readonly rootURL = AppConstants.ntireitURL;
  itlicenses: itlicense[]=[];
  list: itlicenseagreement[];

  constructor(private http: HttpClient,public sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdateitlicenseagreements():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
      itlicenses: this.itlicenses.filter(function(el) { return el!=undefined && Object.keys(el).length!=0; }),
    };
    return this.http.post(AppConstants.ntireitURL + '/itlicenseagreement', body);
  }
  }

  saveOrUpdateitlicenseagreementsList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntireitURL + '/itlicenseagreement', body);
  }
  }

  getitlicenseagreementsList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireitURL + '/itlicenseagreement').toPromise();
  }
  }
  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireitURL + '/itlicenseagreement'+'/param/'+key).toPromise();
  }
  }


  getitlicenseagreementsByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireitURL + '/itlicenseagreement'+'/e/'+id).toPromise();
  }
  }
  getitlicenseagreementsByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireitURL + '/itlicenseagreement'+'/'+id).toPromise();
  }
  }

  deleteitlicenseagreement(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntireitURL + '/itlicenseagreement'+'/'+id).toPromise();
  }
  }
clearList(){
this.itlicenses = [];
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntireitURL + '/itlicenseagreement')
.toPromise()
.then((res:any) => this.list = res as any[]);
}
}


}

