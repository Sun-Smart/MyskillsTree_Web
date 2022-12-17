import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { hrmsemployeeexitquestion } from '../model/hrmsemployeeexitquestion.model';
import { hrmsemployeeexitquestiondetail } from '../model/hrmsemployeeexitquestiondetail.model';
import { environment } from '../../environments/environment';
import { IhrmsemployeeexitquestionResponse } from '../model/hrmsemployeeexitquestion.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class hrmsemployeeexitquestionService {
  formData: hrmsemployeeexitquestion;
  readonly rootURL = AppConstants.baseURL;
  list: hrmsemployeeexitquestion[];
  hrmsemployeeexitquestiondetails: hrmsemployeeexitquestiondetail[]=[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatehrmsemployeeexitquestions():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
      hrmsemployeeexitquestiondetails: this.hrmsemployeeexitquestiondetails.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
    };
    return this.http.post(AppConstants.ntirehrmsURL + '/hrmsemployeeexitquestion', body);
  }
  }

  saveOrUpdatehrmsemployeeexitquestionsList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntirehrmsURL + '/hrmsemployeeexitquestion', body);
  }
  }

  gethrmsemployeeexitquestionsList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeeexitquestion').toPromise();
  }
  }
  getListByexitquestionid(exitquestionid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeeexitquestion'+'/exitquestionid/'+exitquestionid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeeexitquestion'+'/param/'+key).toPromise();
  }
  }


  gethrmsemployeeexitquestionsByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeeexitquestion'+'/e/'+id).toPromise();
  }
  }
  gethrmsemployeeexitquestionsByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeeexitquestion'+'/'+id).toPromise();
  }
  }

  deletehrmsemployeeexitquestion(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntirehrmsURL + '/hrmsemployeeexitquestion'+'/'+id).toPromise();
  }
  }
clearList(){
this.hrmsemployeeexitquestiondetails = [];
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeeexitquestion')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

