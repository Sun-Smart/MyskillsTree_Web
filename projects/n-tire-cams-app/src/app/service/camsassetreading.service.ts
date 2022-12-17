import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { camsassetreading } from '../model/camsassetreading.model';
import { environment } from '../../environments/environment';
import { IcamsassetreadingResponse } from '../model/camsassetreading.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class camsassetreadingService {
  formData: camsassetreading;
  readonly rootURL = AppConstants.baseURL;
  list: camsassetreading[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatecamsassetreadings():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntirecamsURL + '/camsassetreading', body);
  }
  }

  saveOrUpdatecamsassetreadingsList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntirecamsURL + '/camsassetreading', body);
  }
  }

  getcamsassetreadingsList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecamsURL + '/camsassetreading').toPromise();
  }
  }
  getListByreadingid(readingid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecamsURL + '/camsassetreading'+'/readingid/'+readingid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecamsURL + '/camsassetreading'+'/param/'+key).toPromise();
  }
  }


  getcamsassetreadingsByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecamsURL + '/camsassetreading'+'/e/'+id).toPromise();
  }
  }
  getcamsassetreadingsByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecamsURL + '/camsassetreading'+'/'+id).toPromise();
  }
  }

  deletecamsassetreading(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntirecamsURL + '/camsassetreading'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntirecamsURL + '/camsassetreading')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

