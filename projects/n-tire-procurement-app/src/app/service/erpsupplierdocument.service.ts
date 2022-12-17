import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { erpsupplierdocument } from '../model/erpsupplierdocument.model';
import { environment } from '../../environments/environment';
import { IerpsupplierdocumentResponse } from '../model/erpsupplierdocument.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class erpsupplierdocumentService {
  formData: erpsupplierdocument;
  readonly rootURL = AppConstants.baseURL;
  list: erpsupplierdocument[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdateerpsupplierdocuments():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntireprocurementURL + '/erpsupplierdocument', body);
  }
  }

  saveOrUpdateerpsupplierdocumentsList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntireprocurementURL + '/erpsupplierdocument', body);
  }
  }

  geterpsupplierdocumentsList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erpsupplierdocument').toPromise();
  }
  }
  getListByesdid(esdid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erpsupplierdocument'+'/esdid/'+esdid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erpsupplierdocument'+'/param/'+key).toPromise();
  }
  }


  geterpsupplierdocumentsByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erpsupplierdocument'+'/e/'+id).toPromise();
  }
  }
  geterpsupplierdocumentsByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erpsupplierdocument'+'/'+id).toPromise();
  }
  }

  deleteerpsupplierdocument(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntireprocurementURL + '/erpsupplierdocument'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntireprocurementURL + '/erpsupplierdocument')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

