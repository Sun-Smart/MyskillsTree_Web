import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { dmsupload } from '../model/dmsupload.model';
import { environment } from '../../environments/environment';
import { IdmsuploadResponse } from '../model/dmsupload.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class dmsuploadService {
  formData: dmsupload;
  readonly rootURL = AppConstants.baseURL;
  list: dmsupload[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatedmsuploads():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntiredmsURL + '/dmsupload', body);
  }
  }

  saveOrUpdatedmsuploadsList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntiredmsURL + '/dmsupload', body);
  }
  }

  getdmsuploadsList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntiredmsURL + '/dmsupload').toPromise();
  }
  }
  getListByuploadid(uploadid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntiredmsURL + '/dmsupload'+'/uploadid/'+uploadid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntiredmsURL + '/dmsupload'+'/param/'+key).toPromise();
  }
  }


  getdmsuploadsByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntiredmsURL + '/dmsupload'+'/e/'+id).toPromise();
  }
  }
  getdmsuploadsByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntiredmsURL + '/dmsupload'+'/'+id).toPromise();
  }
  }

  deletedmsupload(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntiredmsURL + '/dmsupload'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntiredmsURL + '/dmsupload')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

