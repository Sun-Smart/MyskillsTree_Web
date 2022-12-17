import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { hlpservicecontinuityplandetail } from '../model/hlpservicecontinuityplandetail.model';
import { environment } from '../../environments/environment';
import { IhlpservicecontinuityplandetailResponse } from '../model/hlpservicecontinuityplandetail.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class hlpservicecontinuityplandetailService {
  formData: hlpservicecontinuityplandetail;
  readonly rootURL = AppConstants.baseURL;
  list: hlpservicecontinuityplandetail[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatehlpservicecontinuityplandetails():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntirehelpdeskURL + '/hlpservicecontinuityplandetail', body);
  }
  }

  saveOrUpdatehlpservicecontinuityplandetailsList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntirehelpdeskURL + '/hlpservicecontinuityplandetail', body);
  }
  }

  gethlpservicecontinuityplandetailsList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehelpdeskURL + '/hlpservicecontinuityplandetail').toPromise();
  }
  }
  getListByplandetailid(plandetailid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehelpdeskURL + '/hlpservicecontinuityplandetail'+'/plandetailid/'+plandetailid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehelpdeskURL + '/hlpservicecontinuityplandetail'+'/param/'+key).toPromise();
  }
  }


  gethlpservicecontinuityplandetailsByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehelpdeskURL + '/hlpservicecontinuityplandetail'+'/e/'+id).toPromise();
  }
  }
  gethlpservicecontinuityplandetailsByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehelpdeskURL + '/hlpservicecontinuityplandetail'+'/'+id).toPromise();
  }
  }

  deletehlpservicecontinuityplandetail(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntirehelpdeskURL + '/hlpservicecontinuityplandetail'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntirehelpdeskURL + '/hlpservicecontinuityplandetail')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

