import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { hrmssubordinatedetail } from '../model/hrmssubordinatedetail.model';
import { environment } from '../../environments/environment';
import { IhrmssubordinatedetailResponse } from '../model/hrmssubordinatedetail.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class hrmssubordinatedetailService {
  formData: hrmssubordinatedetail;
  readonly rootURL = AppConstants.baseURL;
  list: hrmssubordinatedetail[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatehrmssubordinatedetails():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntirehrmsURL + '/hrmssubordinatedetail', body);
  }
  }

  saveOrUpdatehrmssubordinatedetailsList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntirehrmsURL + '/hrmssubordinatedetail', body);
  }
  }

  gethrmssubordinatedetailsList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmssubordinatedetail').toPromise();
  }
  }
  getListBysubid(subid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmssubordinatedetail'+'/subid/'+subid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmssubordinatedetail'+'/param/'+key).toPromise();
  }
  }


  gethrmssubordinatedetailsByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmssubordinatedetail'+'/e/'+id).toPromise();
  }
  }
  gethrmssubordinatedetailsByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmssubordinatedetail'+'/'+id).toPromise();
  }
  }

  deletehrmssubordinatedetail(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntirehrmsURL + '/hrmssubordinatedetail'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntirehrmsURL + '/hrmssubordinatedetail')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

