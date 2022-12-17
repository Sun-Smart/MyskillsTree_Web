import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { dmsconfig } from '../model/dmsconfig.model';
import { environment } from '../../environments/environment';
import { IdmsconfigResponse } from '../model/dmsconfig.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class dmsconfigService {
  formData: dmsconfig;
  readonly rootURL = AppConstants.baseURL;
  list: dmsconfig[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatedmsconfigs():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntiredmsURL + '/dmsconfig', body);
  }
  }

  saveOrUpdatedmsconfigsList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntiredmsURL + '/dmsconfig', body);
  }
  }

  getdmsconfigsList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntiredmsURL + '/dmsconfig').toPromise();
  }
  }
  getListByconfigid(configid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntiredmsURL + '/dmsconfig'+'/configid/'+configid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntiredmsURL + '/dmsconfig'+'/param/'+key).toPromise();
  }
  }


  getdmsconfigsByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntiredmsURL + '/dmsconfig'+'/e/'+id).toPromise();
  }
  }
  getdmsconfigsByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntiredmsURL + '/dmsconfig'+'/'+id).toPromise();
  }
  }

  deletedmsconfig(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntiredmsURL + '/dmsconfig'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntiredmsURL + '/dmsconfig')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

