import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { hrmsemployeemedicalassessment } from '../model/hrmsemployeemedicalassessment.model';
import { environment } from '../../environments/environment';
import { IhrmsemployeemedicalassessmentResponse } from '../model/hrmsemployeemedicalassessment.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class hrmsemployeemedicalassessmentService {
  formData: hrmsemployeemedicalassessment;
  readonly rootURL = AppConstants.baseURL;
  list: hrmsemployeemedicalassessment[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatehrmsemployeemedicalassessments():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntirehrmsURL + '/hrmsemployeemedicalassessment', body);
  }
  }

  saveOrUpdatehrmsemployeemedicalassessmentsList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntirehrmsURL + '/hrmsemployeemedicalassessment', body);
  }
  }

  gethrmsemployeemedicalassessmentsList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeemedicalassessment').toPromise();
  }
  }
  getListByconsultationid(consultationid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeemedicalassessment'+'/consultationid/'+consultationid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeemedicalassessment'+'/param/'+key).toPromise();
  }
  }


  gethrmsemployeemedicalassessmentsByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeemedicalassessment'+'/e/'+id).toPromise();
  }
  }
  gethrmsemployeemedicalassessmentsByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeemedicalassessment'+'/'+id).toPromise();
  }
  }

  deletehrmsemployeemedicalassessment(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntirehrmsURL + '/hrmsemployeemedicalassessment'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeemedicalassessment')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

