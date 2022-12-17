import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { hrmsapplicantskill } from '../model/hrmsapplicantskill.model';
import { environment } from '../../environments/environment';
import { IhrmsapplicantskillResponse } from '../model/hrmsapplicantskill.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class hrmsapplicantskillService {
  formData: hrmsapplicantskill;
  readonly rootURL = AppConstants.baseURL;
  list: hrmsapplicantskill[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatehrmsapplicantskills():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntirehrmsURL + '/hrmsapplicantskill', body);
  }
  }

  saveOrUpdatehrmsapplicantskillsList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntirehrmsURL + '/hrmsapplicantskill', body);
  }
  }

  gethrmsapplicantskillsList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsapplicantskill').toPromise();
  }
  }
  getListByskillid(skillid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsapplicantskill'+'/skillid/'+skillid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsapplicantskill'+'/param/'+key).toPromise();
  }
  }


  gethrmsapplicantskillsByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsapplicantskill'+'/e/'+id).toPromise();
  }
  }
  gethrmsapplicantskillsByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsapplicantskill'+'/'+id).toPromise();
  }
  }

  deletehrmsapplicantskill(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntirehrmsURL + '/hrmsapplicantskill'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntirehrmsURL + '/hrmsapplicantskill')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

