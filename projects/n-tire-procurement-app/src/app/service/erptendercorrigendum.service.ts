import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { erptendercorrigendum } from '../model/erptendercorrigendum.model';
import { environment } from '../../environments/environment';
import { IerptendercorrigendumResponse } from '../model/erptendercorrigendum.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class erptendercorrigendumService {
  formData: erptendercorrigendum;
  readonly rootURL = AppConstants.baseURL;
  list: erptendercorrigendum[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdateerptendercorrigendums():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntireprocurementURL + '/erptendercorrigendum', body);
  }
  }

  saveOrUpdateerptendercorrigendumsList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntireprocurementURL + '/erptendercorrigendum', body);
  }
  }

  geterptendercorrigendumsList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erptendercorrigendum').toPromise();
  }
  }
  getListBycorrigendumid(corrigendumid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erptendercorrigendum'+'/corrigendumid/'+corrigendumid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erptendercorrigendum'+'/param/'+key).toPromise();
  }
  }


  geterptendercorrigendumsByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erptendercorrigendum'+'/e/'+id).toPromise();
  }
  }
  geterptendercorrigendumsByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erptendercorrigendum'+'/'+id).toPromise();
  }
  }

  deleteerptendercorrigendum(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntireprocurementURL + '/erptendercorrigendum'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntireprocurementURL + '/erptendercorrigendum')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

