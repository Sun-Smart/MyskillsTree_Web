import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { pmspropertydocument } from '../model/pmspropertydocument.model';
import { environment } from '../../environments/environment';
import { IpmspropertydocumentResponse } from '../model/pmspropertydocument.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class pmspropertydocumentService {
  formData: pmspropertydocument;
  readonly rootURL = AppConstants.baseURL;
  list: pmspropertydocument[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatepmspropertydocuments():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntirepropertyURL + '/pmspropertydocument', body);
  }
  }

  saveOrUpdatepmspropertydocumentsList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntirepropertyURL + '/pmspropertydocument', body);
  }
  }

  getpmspropertydocumentsList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirepropertyURL + '/pmspropertydocument').toPromise();
  }
  }
  getListBydocumentid(documentid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirepropertyURL + '/pmspropertydocument'+'/documentid/'+documentid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirepropertyURL + '/pmspropertydocument'+'/param/'+key).toPromise();
  }
  }


  getpmspropertydocumentsByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirepropertyURL + '/pmspropertydocument'+'/e/'+id).toPromise();
  }
  }
  getpmspropertydocumentsByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirepropertyURL + '/pmspropertydocument'+'/'+id).toPromise();
  }
  }

  deletepmspropertydocument(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntirepropertyURL + '/pmspropertydocument'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntirepropertyURL + '/pmspropertydocument')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

