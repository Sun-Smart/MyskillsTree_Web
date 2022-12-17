import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { dmssubscription } from '../model/dmssubscription.model';
import { environment } from '../../environments/environment';
import { IdmssubscriptionResponse } from '../model/dmssubscription.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class dmssubscriptionService {
  formData: dmssubscription;
  readonly rootURL = AppConstants.baseURL;
  list: dmssubscription[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatedmssubscriptions():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntiredmsURL + '/dmssubscription', body);
  }
  }

  saveOrUpdatedmssubscriptionsList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntiredmsURL + '/dmssubscription', body);
  }
  }

  getdmssubscriptionsList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntiredmsURL + '/dmssubscription').toPromise();
  }
  }
  getListBysubscriptionid(subscriptionid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntiredmsURL + '/dmssubscription'+'/subscriptionid/'+subscriptionid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntiredmsURL + '/dmssubscription'+'/param/'+key).toPromise();
  }
  }


  getdmssubscriptionsByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntiredmsURL + '/dmssubscription'+'/e/'+id).toPromise();
  }
  }
  getdmssubscriptionsByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntiredmsURL + '/dmssubscription'+'/'+id).toPromise();
  }
  }

  deletedmssubscription(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntiredmsURL + '/dmssubscription'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntiredmsURL + '/dmssubscription')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

