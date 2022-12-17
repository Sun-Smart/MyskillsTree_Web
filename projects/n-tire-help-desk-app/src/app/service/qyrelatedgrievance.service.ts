import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { qyrelatedgrievance } from '../model/qyrelatedgrievance.model';
import { environment } from '../../environments/environment';
import { IqyrelatedgrievanceResponse } from '../model/qyrelatedgrievance.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class qyrelatedgrievanceService {
  formData: qyrelatedgrievance;
  readonly rootURL = AppConstants.baseURL;
  list: qyrelatedgrievance[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdateqyrelatedgrievances():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntirehelpdeskURL + '/qyrelatedgrievance', body);
  }
  }

  saveOrUpdateqyrelatedgrievancesList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntirehelpdeskURL + '/qyrelatedgrievance', body);
  }
  }

  getqyrelatedgrievancesList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehelpdeskURL + '/qyrelatedgrievance').toPromise();
  }
  }
  getListByrelatedid(relatedid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehelpdeskURL + '/qyrelatedgrievance'+'/relatedid/'+relatedid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehelpdeskURL + '/qyrelatedgrievance'+'/param/'+key).toPromise();
  }
  }


  getqyrelatedgrievancesByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehelpdeskURL + '/qyrelatedgrievance'+'/e/'+id).toPromise();
  }
  }
  getqyrelatedgrievancesByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehelpdeskURL + '/qyrelatedgrievance'+'/'+id).toPromise();
  }
  }

  deleteqyrelatedgrievance(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntirehelpdeskURL + '/qyrelatedgrievance'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntirehelpdeskURL + '/qyrelatedgrievance')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

