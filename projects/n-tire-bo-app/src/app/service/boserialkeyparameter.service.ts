import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { boserialkeyparameter } from '../model/boserialkeyparameter.model';
import { environment } from '../../environments/environment';
import { IboserialkeyparameterResponse } from '../model/boserialkeyparameter.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../shared/helper'
import { SessionService } from '../pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class boserialkeyparameterService {
  formData: boserialkeyparameter;
  readonly rootURL = AppConstants.baseURL;
  list: boserialkeyparameter[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdateboserialkeyparameters():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntireboURL + '/boserialkeyparameter', body);
  }
  }

  saveOrUpdateboserialkeyparametersList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntireboURL + '/boserialkeyparameter', body);
  }
  }

  getboserialkeyparametersList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/boserialkeyparameter').toPromise();
  }
  }
  getListByserialkeyid(serialkeyid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/boserialkeyparameter'+'/serialkeyid/'+serialkeyid).toPromise();
  }
  }

  getListBytablename(tablename:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/boserialkeyparameter'+'/tablename/'+tablename).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/boserialkeyparameter'+'/param/'+key).toPromise();
  }
  }


  getboserialkeyparametersByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/boserialkeyparameter'+'/e/'+id).toPromise();
  }
  }
  getboserialkeyparametersByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/boserialkeyparameter'+'/'+id).toPromise();
  }
  }

  deleteboserialkeyparameter(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntireboURL + '/boserialkeyparameter'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntireboURL + '/boserialkeyparameter')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

