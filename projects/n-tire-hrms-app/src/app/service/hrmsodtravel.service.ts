import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { hrmsodtravel } from '../model/hrmsodtravel.model';
import { environment } from '../../environments/environment';
import { IhrmsodtravelResponse } from '../model/hrmsodtravel.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class hrmsodtravelService {
  formData: hrmsodtravel;
  readonly rootURL = AppConstants.baseURL;
  list: hrmsodtravel[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatehrmsodtravels():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntirehrmsURL + '/hrmsodtravel', body);
  }
  }

  saveOrUpdatehrmsodtravelsList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntirehrmsURL + '/hrmsodtravel', body);
  }
  }

  gethrmsodtravelsList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsodtravel').toPromise();
  }
  }
  getListByodtravelid(odtravelid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsodtravel'+'/odtravelid/'+odtravelid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsodtravel'+'/param/'+key).toPromise();
  }
  }


  gethrmsodtravelsByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsodtravel'+'/e/'+id).toPromise();
  }
  }
  gethrmsodtravelsByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsodtravel'+'/'+id).toPromise();
  }
  }

  deletehrmsodtravel(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntirehrmsURL + '/hrmsodtravel'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntirehrmsURL + '/hrmsodtravel')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

