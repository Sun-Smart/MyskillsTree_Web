import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { erptenderquestion } from '../model/erptenderquestion.model';
import { environment } from '../../environments/environment';
import { IerptenderquestionResponse } from '../model/erptenderquestion.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class erptenderquestionService {
  formData: erptenderquestion;
  readonly rootURL = AppConstants.baseURL;
  list: erptenderquestion[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdateerptenderquestions():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntireprocurementURL + '/erptenderquestion', body);
  }
  }

  saveOrUpdateerptenderquestionsList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntireprocurementURL + '/erptenderquestion', body);
  }
  }

  geterptenderquestionsList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erptenderquestion').toPromise();
  }
  }
  getListByquestionid(questionid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erptenderquestion'+'/questionid/'+questionid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erptenderquestion'+'/param/'+key).toPromise();
  }
  }


  geterptenderquestionsByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erptenderquestion'+'/e/'+id).toPromise();
  }
  }
  geterptenderquestionsByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erptenderquestion'+'/'+id).toPromise();
  }
  }

  deleteerptenderquestion(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntireprocurementURL + '/erptenderquestion'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntireprocurementURL + '/erptenderquestion')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

