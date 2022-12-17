import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { hrmsemployeeachievement } from '../model/hrmsemployeeachievement.model';
import { environment } from '../../environments/environment';
import { IhrmsemployeeachievementResponse } from '../model/hrmsemployeeachievement.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class hrmsemployeeachievementService {
  formData: hrmsemployeeachievement;
  readonly rootURL = AppConstants.baseURL;
  list: hrmsemployeeachievement[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatehrmsemployeeachievements():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntirehrmsURL + '/hrmsemployeeachievement', body);
  }
  }

  saveOrUpdatehrmsemployeeachievementsList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntirehrmsURL + '/hrmsemployeeachievement', body);
  }
  }

  gethrmsemployeeachievementsList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeeachievement').toPromise();
  }
  }
  getListByachievementid(achievementid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeeachievement'+'/achievementid/'+achievementid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeeachievement'+'/param/'+key).toPromise();
  }
  }


  gethrmsemployeeachievementsByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeeachievement'+'/e/'+id).toPromise();
  }
  }
  gethrmsemployeeachievementsByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeeachievement'+'/'+id).toPromise();
  }
  }

  deletehrmsemployeeachievement(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntirehrmsURL + '/hrmsemployeeachievement'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeeachievement')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

