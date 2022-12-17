import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { vmsemployeeparcel } from '../model/vmsemployeeparcel.model';
import { environment } from '../../environments/environment';
import { IvmsemployeeparcelResponse } from '../model/vmsemployeeparcel.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class vmsemployeeparcelService {
  formData: vmsemployeeparcel;
  readonly rootURL = AppConstants.baseURL;
  list: vmsemployeeparcel[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatevmsemployeeparcels():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntirevisitorURL + '/vmsemployeeparcel', body);
  }
  }

  saveOrUpdatevmsemployeeparcelsList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntirevisitorURL + '/vmsemployeeparcel', body);
  }
  }

  getvmsemployeeparcelsList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirevisitorURL + '/vmsemployeeparcel').toPromise();
  }
  }
  getListByparcelid(parcelid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirevisitorURL + '/vmsemployeeparcel'+'/parcelid/'+parcelid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirevisitorURL + '/vmsemployeeparcel'+'/param/'+key).toPromise();
  }
  }


  getvmsemployeeparcelsByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirevisitorURL + '/vmsemployeeparcel'+'/e/'+id).toPromise();
  }
  }
  getvmsemployeeparcelsByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirevisitorURL + '/vmsemployeeparcel'+'/'+id).toPromise();
  }
  }

  deletevmsemployeeparcel(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntirevisitorURL + '/vmsemployeeparcel'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntirevisitorURL + '/vmsemployeeparcel')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

