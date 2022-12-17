import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { hrmsleavepolicymaster } from '../model/hrmsleavepolicymaster.model';
import { environment } from '../../environments/environment';
import { IhrmsleavepolicymasterResponse } from '../model/hrmsleavepolicymaster.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class hrmsleavepolicymasterService {
  formData: hrmsleavepolicymaster;
  readonly rootURL = AppConstants.baseURL;
  list: hrmsleavepolicymaster[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatehrmsleavepolicymasters():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntirehrmsURL + '/hrmsleavepolicymaster', body);
  }
  }

  saveOrUpdatehrmsleavepolicymastersList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntirehrmsURL + '/hrmsleavepolicymaster', body);
  }
  }

  gethrmsleavepolicymastersList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsleavepolicymaster').toPromise();
  }
  }
  getListByleavetypeid(leavetypeid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsleavepolicymaster'+'/leavetypeid/'+leavetypeid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsleavepolicymaster'+'/param/'+key).toPromise();
  }
  }


  gethrmsleavepolicymastersByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsleavepolicymaster'+'/e/'+id).toPromise();
  }
  }
  gethrmsleavepolicymastersByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsleavepolicymaster'+'/'+id).toPromise();
  }
  }

  deletehrmsleavepolicymaster(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntirehrmsURL + '/hrmsleavepolicymaster'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntirehrmsURL + '/hrmsleavepolicymaster')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

