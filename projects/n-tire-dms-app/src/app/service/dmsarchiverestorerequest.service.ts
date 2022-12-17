import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { dmsarchiverestorerequest } from '../model/dmsarchiverestorerequest.model';
import { environment } from '../../environments/environment';
import { IdmsarchiverestorerequestResponse } from '../model/dmsarchiverestorerequest.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class dmsarchiverestorerequestService {
  formData: dmsarchiverestorerequest;
  readonly rootURL = AppConstants.baseURL;
  list: dmsarchiverestorerequest[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatedmsarchiverestorerequests():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntiredmsURL + '/dmsarchiverestorerequest', body);
  }
  }

  saveOrUpdatedmsarchiverestorerequestsList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntiredmsURL + '/dmsarchiverestorerequest', body);
  }
  }

  getdmsarchiverestorerequestsList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntiredmsURL + '/dmsarchiverestorerequest').toPromise();
  }
  }
  getListByrequestid(requestid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntiredmsURL + '/dmsarchiverestorerequest'+'/requestid/'+requestid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntiredmsURL + '/dmsarchiverestorerequest'+'/param/'+key).toPromise();
  }
  }


  getdmsarchiverestorerequestsByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntiredmsURL + '/dmsarchiverestorerequest'+'/e/'+id).toPromise();
  }
  }
  getdmsarchiverestorerequestsByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntiredmsURL + '/dmsarchiverestorerequest'+'/'+id).toPromise();
  }
  }

  deletedmsarchiverestorerequest(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntiredmsURL + '/dmsarchiverestorerequest'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntiredmsURL + '/dmsarchiverestorerequest')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

