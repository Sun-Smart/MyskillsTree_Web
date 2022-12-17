import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { hrmsgrademaster } from '../model/hrmsgrademaster.model';
import { environment } from '../../environments/environment';
import { IhrmsgrademasterResponse } from '../model/hrmsgrademaster.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class hrmsgrademasterService {
  formData: hrmsgrademaster;
  readonly rootURL = AppConstants.baseURL;
  list: hrmsgrademaster[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatehrmsgrademasters():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntirehrmsURL + '/hrmsgrademaster', body);
  }
  }

  saveOrUpdatehrmsgrademastersList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntirehrmsURL + '/hrmsgrademaster', body);
  }
  }

  gethrmsgrademastersList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsgrademaster').toPromise();
  }
  }
  getListBygradeid(gradeid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsgrademaster'+'/gradeid/'+gradeid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsgrademaster'+'/param/'+key).toPromise();
  }
  }


  gethrmsgrademastersByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsgrademaster'+'/e/'+id).toPromise();
  }
  }
  gethrmsgrademastersByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsgrademaster'+'/'+id).toPromise();
  }
  }

  deletehrmsgrademaster(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntirehrmsURL + '/hrmsgrademaster'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntirehrmsURL + '/hrmsgrademaster')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

