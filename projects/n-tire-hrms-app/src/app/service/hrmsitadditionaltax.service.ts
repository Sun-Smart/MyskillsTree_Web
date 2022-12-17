import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { hrmsitadditionaltax } from '../model/hrmsitadditionaltax.model';
import { environment } from '../../environments/environment';
import { IhrmsitadditionaltaxResponse } from '../model/hrmsitadditionaltax.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class hrmsitadditionaltaxService {
  formData: hrmsitadditionaltax;
  readonly rootURL = AppConstants.baseURL;
  list: hrmsitadditionaltax[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatehrmsitadditionaltaxes():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntirehrmsURL + '/hrmsitadditionaltax', body);
  }
  }

  saveOrUpdatehrmsitadditionaltaxesList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntirehrmsURL + '/hrmsitadditionaltax', body);
  }
  }

  gethrmsitadditionaltaxesList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsitadditionaltax').toPromise();
  }
  }
  getListByataxid(ataxid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsitadditionaltax'+'/ataxid/'+ataxid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsitadditionaltax'+'/param/'+key).toPromise();
  }
  }


  gethrmsitadditionaltaxesByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsitadditionaltax'+'/e/'+id).toPromise();
  }
  }
  gethrmsitadditionaltaxesByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsitadditionaltax'+'/'+id).toPromise();
  }
  }

  deletehrmsitadditionaltax(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntirehrmsURL + '/hrmsitadditionaltax'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntirehrmsURL + '/hrmsitadditionaltax')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

