import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { reclinkedrecord } from '../model/reclinkedrecord.model';
import { environment } from '../../environments/environment';
import { IreclinkedrecordResponse } from '../model/reclinkedrecord.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class reclinkedrecordService {
  formData: reclinkedrecord;
  readonly rootURL = AppConstants.baseURL;
  list: reclinkedrecord[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatereclinkedrecords():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntiredmsURL + '/reclinkedrecord', body);
  }
  }

  saveOrUpdatereclinkedrecordsList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntiredmsURL + '/reclinkedrecord', body);
  }
  }

  getreclinkedrecordsList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntiredmsURL + '/reclinkedrecord').toPromise();
  }
  }
  getListBylinkedrecordid(linkedrecordid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntiredmsURL + '/reclinkedrecord'+'/linkedrecordid/'+linkedrecordid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntiredmsURL + '/reclinkedrecord'+'/param/'+key).toPromise();
  }
  }


  getreclinkedrecordsByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntiredmsURL + '/reclinkedrecord'+'/e/'+id).toPromise();
  }
  }
  getreclinkedrecordsByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntiredmsURL + '/reclinkedrecord'+'/'+id).toPromise();
  }
  }

  deletereclinkedrecord(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntiredmsURL + '/reclinkedrecord'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntiredmsURL + '/reclinkedrecord')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

