import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lmsquotedetail } from '../model/lmsquotedetail.model';
import { environment } from '../../environments/environment';
import { IlmsquotedetailResponse } from '../model/lmsquotedetail.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class lmsquotedetailService {
  formData: lmsquotedetail;
  readonly rootURL = AppConstants.baseURL;
  list: lmsquotedetail[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatelmsquotedetails():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntirecrmURL + '/lmsquotedetail', body);
  }
  }

  saveOrUpdatelmsquotedetailsList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntirecrmURL + '/lmsquotedetail', body);
  }
  }

  getlmsquotedetailsList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecrmURL + '/lmsquotedetail').toPromise();
  }
  }
  getListByquotedetailid(quotedetailid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecrmURL + '/lmsquotedetail'+'/quotedetailid/'+quotedetailid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecrmURL + '/lmsquotedetail'+'/param/'+key).toPromise();
  }
  }


  getlmsquotedetailsByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecrmURL + '/lmsquotedetail'+'/e/'+id).toPromise();
  }
  }
  getlmsquotedetailsByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecrmURL + '/lmsquotedetail'+'/'+id).toPromise();
  }
  }

  deletelmsquotedetail(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntirecrmURL + '/lmsquotedetail'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntirecrmURL + '/lmsquotedetail')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

