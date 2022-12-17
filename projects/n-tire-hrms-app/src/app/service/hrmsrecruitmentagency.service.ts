import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { hrmsrecruitmentagency } from '../model/hrmsrecruitmentagency.model';
import { environment } from '../../environments/environment';
import { IhrmsrecruitmentagencyResponse } from '../model/hrmsrecruitmentagency.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class hrmsrecruitmentagencyService {
  formData: hrmsrecruitmentagency;
  readonly rootURL = AppConstants.baseURL;
  list: hrmsrecruitmentagency[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatehrmsrecruitmentagencies():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntirehrmsURL + '/hrmsrecruitmentagency', body);
  }
  }

  saveOrUpdatehrmsrecruitmentagenciesList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntirehrmsURL + '/hrmsrecruitmentagency', body);
  }
  }

  gethrmsrecruitmentagenciesList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsrecruitmentagency').toPromise();
  }
  }
  getListByraid(raid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsrecruitmentagency'+'/raid/'+raid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsrecruitmentagency'+'/param/'+key).toPromise();
  }
  }


  gethrmsrecruitmentagenciesByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsrecruitmentagency'+'/e/'+id).toPromise();
  }
  }
  gethrmsrecruitmentagenciesByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsrecruitmentagency'+'/'+id).toPromise();
  }
  }

  deletehrmsrecruitmentagency(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntirehrmsURL + '/hrmsrecruitmentagency'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntirehrmsURL + '/hrmsrecruitmentagency')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

