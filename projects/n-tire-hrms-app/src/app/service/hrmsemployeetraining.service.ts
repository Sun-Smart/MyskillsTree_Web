import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { hrmsemployeetraining } from '../model/hrmsemployeetraining.model';
import { environment } from '../../environments/environment';
import { IhrmsemployeetrainingResponse } from '../model/hrmsemployeetraining.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class hrmsemployeetrainingService {
  formData: hrmsemployeetraining;
  readonly rootURL = AppConstants.baseURL;
  list: hrmsemployeetraining[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatehrmsemployeetrainings():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntirehrmsURL + '/hrmsemployeetraining', body);
  }
  }

  saveOrUpdatehrmsemployeetrainingsList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntirehrmsURL + '/hrmsemployeetraining', body);
  }
  }

  gethrmsemployeetrainingsList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeetraining').toPromise();
  }
  }
  getListByemptrainingid(emptrainingid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeetraining'+'/emptrainingid/'+emptrainingid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeetraining'+'/param/'+key).toPromise();
  }
  }


  gethrmsemployeetrainingsByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeetraining'+'/e/'+id).toPromise();
  }
  }
  gethrmsemployeetrainingsByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeetraining'+'/'+id).toPromise();
  }
  }

  deletehrmsemployeetraining(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntirehrmsURL + '/hrmsemployeetraining'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeetraining')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

