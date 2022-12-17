import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { hlpticketdetail } from '../model/hlpticketdetail.model';
import { environment } from '../../environments/environment';
import { IhlpticketdetailResponse } from '../model/hlpticketdetail.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class hlpticketdetailService {
  formData: hlpticketdetail;
  readonly rootURL = AppConstants.baseURL;
  list: hlpticketdetail[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatehlpticketdetails():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntirehelpdeskURL + '/hlpticketdetail', body);
  }
  }

  saveOrUpdatehlpticketdetailsList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntirehelpdeskURL + '/hlpticketdetail', body);
  }
  }

  gethlpticketdetailsList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehelpdeskURL + '/hlpticketdetail').toPromise();
  }
  }
  getListByticketdetailid(ticketdetailid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehelpdeskURL + '/hlpticketdetail'+'/ticketdetailid/'+ticketdetailid).toPromise();
  }
  }

  getListBysourcereference(sourcereference:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehelpdeskURL + '/hlpticketdetail'+'/sourcereference/'+sourcereference).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehelpdeskURL + '/hlpticketdetail'+'/param/'+key).toPromise();
  }
  }


  gethlpticketdetailsByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehelpdeskURL + '/hlpticketdetail'+'/e/'+id).toPromise();
  }
  }
  gethlpticketdetailsByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehelpdeskURL + '/hlpticketdetail'+'/'+id).toPromise();
  }
  }

  deletehlpticketdetail(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntirehelpdeskURL + '/hlpticketdetail'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntirehelpdeskURL + '/hlpticketdetail')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

