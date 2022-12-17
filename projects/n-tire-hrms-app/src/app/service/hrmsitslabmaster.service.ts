import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { hrmsitslabmaster } from '../model/hrmsitslabmaster.model';
import { environment } from '../../environments/environment';
import { IhrmsitslabmasterResponse } from '../model/hrmsitslabmaster.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class hrmsitslabmasterService {
  formData: hrmsitslabmaster;
  readonly rootURL = AppConstants.baseURL;
  list: hrmsitslabmaster[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatehrmsitslabmasters():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntirehrmsURL + '/hrmsitslabmaster', body);
  }
  }

  saveOrUpdatehrmsitslabmastersList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntirehrmsURL + '/hrmsitslabmaster', body);
  }
  }

  gethrmsitslabmastersList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsitslabmaster').toPromise();
  }
  }
  getListByslabid(slabid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsitslabmaster'+'/slabid/'+slabid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsitslabmaster'+'/param/'+key).toPromise();
  }
  }


  gethrmsitslabmastersByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsitslabmaster'+'/e/'+id).toPromise();
  }
  }
  gethrmsitslabmastersByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsitslabmaster'+'/'+id).toPromise();
  }
  }

  deletehrmsitslabmaster(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntirehrmsURL + '/hrmsitslabmaster'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntirehrmsURL + '/hrmsitslabmaster')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

