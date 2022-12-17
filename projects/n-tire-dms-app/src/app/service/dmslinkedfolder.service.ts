import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { dmslinkedfolder } from '../model/dmslinkedfolder.model';
import { environment } from '../../environments/environment';
import { IdmslinkedfolderResponse } from '../model/dmslinkedfolder.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class dmslinkedfolderService {
  formData: dmslinkedfolder;
  readonly rootURL = AppConstants.baseURL;
  list: dmslinkedfolder[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatedmslinkedfolders():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntiredmsURL + '/dmslinkedfolder', body);
  }
  }

  saveOrUpdatedmslinkedfoldersList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntiredmsURL + '/dmslinkedfolder', body);
  }
  }

  getdmslinkedfoldersList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntiredmsURL + '/dmslinkedfolder').toPromise();
  }
  }
  getListBylinkedid(linkedid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntiredmsURL + '/dmslinkedfolder'+'/linkedid/'+linkedid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntiredmsURL + '/dmslinkedfolder'+'/param/'+key).toPromise();
  }
  }


  getdmslinkedfoldersByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntiredmsURL + '/dmslinkedfolder'+'/e/'+id).toPromise();
  }
  }
  getdmslinkedfoldersByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntiredmsURL + '/dmslinkedfolder'+'/'+id).toPromise();
  }
  }

  deletedmslinkedfolder(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntiredmsURL + '/dmslinkedfolder'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntiredmsURL + '/dmslinkedfolder')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

