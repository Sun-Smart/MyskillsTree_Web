import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { prjprojectoutput } from '../model/prjprojectoutput.model';
import { environment } from '../../environments/environment';
import { IprjprojectoutputResponse } from '../model/prjprojectoutput.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class prjprojectoutputService {
  formData: prjprojectoutput;
  readonly rootURL = AppConstants.baseURL;
  list: prjprojectoutput[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdateprjprojectoutputs():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntireprojectURL + '/prjprojectoutput', body);
  }
  }

  saveOrUpdateprjprojectoutputsList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntireprojectURL + '/prjprojectoutput', body);
  }
  }

  getprjprojectoutputsList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprojectURL + '/prjprojectoutput').toPromise();
  }
  }
  getListByoutputid(outputid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprojectURL + '/prjprojectoutput'+'/outputid/'+outputid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprojectURL + '/prjprojectoutput'+'/param/'+key).toPromise();
  }
  }


  getprjprojectoutputsByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprojectURL + '/prjprojectoutput'+'/e/'+id).toPromise();
  }
  }
  getprjprojectoutputsByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprojectURL + '/prjprojectoutput'+'/'+id).toPromise();
  }
  }

  deleteprjprojectoutput(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntireprojectURL + '/prjprojectoutput'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntireprojectURL + '/prjprojectoutput')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

