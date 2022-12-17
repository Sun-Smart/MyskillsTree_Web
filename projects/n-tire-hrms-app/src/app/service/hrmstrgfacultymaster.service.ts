import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { hrmstrgfacultymaster } from '../model/hrmstrgfacultymaster.model';
import { environment } from '../../environments/environment';
import { IhrmstrgfacultymasterResponse } from '../model/hrmstrgfacultymaster.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class hrmstrgfacultymasterService {
  formData: hrmstrgfacultymaster;
  readonly rootURL = AppConstants.baseURL;
  list: hrmstrgfacultymaster[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatehrmstrgfacultymasters():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntirehrmsURL + '/hrmstrgfacultymaster', body);
  }
  }

  saveOrUpdatehrmstrgfacultymastersList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntirehrmsURL + '/hrmstrgfacultymaster', body);
  }
  }

  gethrmstrgfacultymastersList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmstrgfacultymaster').toPromise();
  }
  }
  getListByfacultyid(facultyid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmstrgfacultymaster'+'/facultyid/'+facultyid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmstrgfacultymaster'+'/param/'+key).toPromise();
  }
  }


  gethrmstrgfacultymastersByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmstrgfacultymaster'+'/e/'+id).toPromise();
  }
  }
  gethrmstrgfacultymastersByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmstrgfacultymaster'+'/'+id).toPromise();
  }
  }

  deletehrmstrgfacultymaster(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntirehrmsURL + '/hrmstrgfacultymaster'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntirehrmsURL + '/hrmstrgfacultymaster')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

