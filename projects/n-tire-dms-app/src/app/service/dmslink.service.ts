import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { dmslink } from '../model/dmslink.model';
import { environment } from '../../environments/environment';
import { IdmslinkResponse } from '../model/dmslink.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class dmslinkService {
  formData: dmslink;
  readonly rootURL = AppConstants.baseURL;
  list: dmslink[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatedmslinks():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntiredmsURL + '/dmslink', body);
  }
  }

  saveOrUpdatedmslinksList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntiredmsURL + '/dmslink', body);
  }
  }

  getdmslinksList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntiredmsURL + '/dmslink').toPromise();
  }
  }
  getListBylinkid(linkid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntiredmsURL + '/dmslink'+'/linkid/'+linkid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntiredmsURL + '/dmslink'+'/param/'+key).toPromise();
  }
  }


  getdmslinksByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntiredmsURL + '/dmslink'+'/e/'+id).toPromise();
  }
  }
  getdmslinksByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntiredmsURL + '/dmslink'+'/'+id).toPromise();
  }
  }

  deletedmslink(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntiredmsURL + '/dmslink'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntiredmsURL + '/dmslink')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

