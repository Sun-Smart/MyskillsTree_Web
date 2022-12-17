import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { vmsworkplacebooking } from '../model/vmsworkplacebooking.model';
import { environment } from '../../environments/environment';
import { IvmsworkplacebookingResponse } from '../model/vmsworkplacebooking.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class vmsworkplacebookingService {
  formData: vmsworkplacebooking;
  readonly rootURL = AppConstants.baseURL;
  list: vmsworkplacebooking[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatevmsworkplacebookings():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntirevisitorURL + '/vmsworkplacebooking', body);
  }
  }

  saveOrUpdatevmsworkplacebookingsList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntirevisitorURL + '/vmsworkplacebooking', body);
  }
  }

  getvmsworkplacebookingsList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirevisitorURL + '/vmsworkplacebooking').toPromise();
  }
  }
  getListBybookingid(bookingid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirevisitorURL + '/vmsworkplacebooking'+'/bookingid/'+bookingid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirevisitorURL + '/vmsworkplacebooking'+'/param/'+key).toPromise();
  }
  }


  getvmsworkplacebookingsByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirevisitorURL + '/vmsworkplacebooking'+'/e/'+id).toPromise();
  }
  }
  getvmsworkplacebookingsByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirevisitorURL + '/vmsworkplacebooking'+'/'+id).toPromise();
  }
  }

  deletevmsworkplacebooking(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntirevisitorURL + '/vmsworkplacebooking'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntirevisitorURL + '/vmsworkplacebooking')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

