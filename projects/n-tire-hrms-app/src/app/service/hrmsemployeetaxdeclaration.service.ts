import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { hrmsemployeetaxdeclaration } from '../model/hrmsemployeetaxdeclaration.model';
import { environment } from '../../environments/environment';
import { IhrmsemployeetaxdeclarationResponse } from '../model/hrmsemployeetaxdeclaration.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class hrmsemployeetaxdeclarationService {
  formData: hrmsemployeetaxdeclaration;
  readonly rootURL = AppConstants.baseURL;
  list: hrmsemployeetaxdeclaration[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatehrmsemployeetaxdeclarations():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntirehrmsURL + '/hrmsemployeetaxdeclaration', body);
  }
  }

  saveOrUpdatehrmsemployeetaxdeclarationsList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntirehrmsURL + '/hrmsemployeetaxdeclaration', body);
  }
  }

  gethrmsemployeetaxdeclarationsList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeetaxdeclaration').toPromise();
  }
  }
  getListBydeclarationid(declarationid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeetaxdeclaration'+'/declarationid/'+declarationid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeetaxdeclaration'+'/param/'+key).toPromise();
  }
  }


  gethrmsemployeetaxdeclarationsByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeetaxdeclaration'+'/e/'+id).toPromise();
  }
  }
  gethrmsemployeetaxdeclarationsByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeetaxdeclaration'+'/'+id).toPromise();
  }
  }

  deletehrmsemployeetaxdeclaration(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntirehrmsURL + '/hrmsemployeetaxdeclaration'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeetaxdeclaration')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

