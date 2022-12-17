import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { hrmsemployeenominee } from '../model/hrmsemployeenominee.model';
import { environment } from '../../environments/environment';
import { IhrmsemployeenomineeResponse } from '../model/hrmsemployeenominee.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class hrmsemployeenomineeService {
  formData: hrmsemployeenominee;
  readonly rootURL = AppConstants.baseURL;
  list: hrmsemployeenominee[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatehrmsemployeenominees():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntirehrmsURL + '/hrmsemployeenominee', body);
  }
  }

  saveOrUpdatehrmsemployeenomineesList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntirehrmsURL + '/hrmsemployeenominee', body);
  }
  }

  gethrmsemployeenomineesList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeenominee').toPromise();
  }
  }
  getListBynomineeid(nomineeid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeenominee'+'/nomineeid/'+nomineeid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeenominee'+'/param/'+key).toPromise();
  }
  }


  gethrmsemployeenomineesByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeenominee'+'/e/'+id).toPromise();
  }
  }
  gethrmsemployeenomineesByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeenominee'+'/'+id).toPromise();
  }
  }

  deletehrmsemployeenominee(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntirehrmsURL + '/hrmsemployeenominee'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeenominee')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

