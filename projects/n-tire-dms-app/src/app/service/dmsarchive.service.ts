import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { dmsarchive } from '../model/dmsarchive.model';
import { environment } from '../../environments/environment';
import { IdmsarchiveResponse } from '../model/dmsarchive.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class dmsarchiveService {
  formData: dmsarchive;
  readonly rootURL = AppConstants.baseURL;
  list: dmsarchive[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatedmsarchives():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntiredmsURL + '/dmsarchive', body);
  }
  }

  saveOrUpdatedmsarchivesList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntiredmsURL + '/dmsarchive', body);
  }
  }

  getdmsarchivesList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntiredmsURL + '/dmsarchive').toPromise();
  }
  }
  getListByarchiveid(archiveid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntiredmsURL + '/dmsarchive'+'/archiveid/'+archiveid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntiredmsURL + '/dmsarchive'+'/param/'+key).toPromise();
  }
  }


  getdmsarchivesByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntiredmsURL + '/dmsarchive'+'/e/'+id).toPromise();
  }
  }
  getdmsarchivesByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntiredmsURL + '/dmsarchive'+'/'+id).toPromise();
  }
  }

  deletedmsarchive(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntiredmsURL + '/dmsarchive'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntiredmsURL + '/dmsarchive')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

