import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { dmsmimetype } from '../model/dmsmimetype.model';
import { environment } from '../../environments/environment';
import { IdmsmimetypeResponse } from '../model/dmsmimetype.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class dmsmimetypeService {
  formData: dmsmimetype;
  readonly rootURL = AppConstants.baseURL;
  list: dmsmimetype[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatedmsmimetypes():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntiredmsURL + '/dmsmimetype', body);
  }
  }

  saveOrUpdatedmsmimetypesList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntiredmsURL + '/dmsmimetype', body);
  }
  }

  getdmsmimetypesList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntiredmsURL + '/dmsmimetype').toPromise();
  }
  }
  getListBymimetypeid(mimetypeid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntiredmsURL + '/dmsmimetype'+'/mimetypeid/'+mimetypeid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntiredmsURL + '/dmsmimetype'+'/param/'+key).toPromise();
  }
  }


  getdmsmimetypesByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntiredmsURL + '/dmsmimetype'+'/e/'+id).toPromise();
  }
  }
  getdmsmimetypesByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntiredmsURL + '/dmsmimetype'+'/'+id).toPromise();
  }
  }

  deletedmsmimetype(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntiredmsURL + '/dmsmimetype'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntiredmsURL + '/dmsmimetype')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

