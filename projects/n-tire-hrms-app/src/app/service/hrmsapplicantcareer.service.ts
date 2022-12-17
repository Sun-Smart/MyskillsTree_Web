import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { hrmsapplicantcareer } from '../model/hrmsapplicantcareer.model';
import { environment } from '../../environments/environment';
import { IhrmsapplicantcareerResponse } from '../model/hrmsapplicantcareer.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class hrmsapplicantcareerService {
  formData: hrmsapplicantcareer;
  readonly rootURL = AppConstants.baseURL;
  list: hrmsapplicantcareer[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatehrmsapplicantcareers():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntirehrmsURL + '/hrmsapplicantcareer', body);
  }
  }

  saveOrUpdatehrmsapplicantcareersList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntirehrmsURL + '/hrmsapplicantcareer', body);
  }
  }

  gethrmsapplicantcareersList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsapplicantcareer').toPromise();
  }
  }
  getListByhacid(hacid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsapplicantcareer'+'/hacid/'+hacid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsapplicantcareer'+'/param/'+key).toPromise();
  }
  }


  gethrmsapplicantcareersByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsapplicantcareer'+'/e/'+id).toPromise();
  }
  }
  gethrmsapplicantcareersByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsapplicantcareer'+'/'+id).toPromise();
  }
  }

  deletehrmsapplicantcareer(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntirehrmsURL + '/hrmsapplicantcareer'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntirehrmsURL + '/hrmsapplicantcareer')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

