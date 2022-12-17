import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { hrmsshiftmaster } from '../model/hrmsshiftmaster.model';
import { hrmsemployeeshift } from '../model/hrmsemployeeshift.model';
import { hrmsemployeeshiftpreference } from '../model/hrmsemployeeshiftpreference.model';
import { environment } from '../../environments/environment';
import { IhrmsshiftmasterResponse } from '../model/hrmsshiftmaster.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class hrmsshiftmasterService {
  formData: hrmsshiftmaster;
  readonly rootURL = AppConstants.baseURL;
  list: hrmsshiftmaster[];
  hrmsemployeeshifts: hrmsemployeeshift[]=[];
  hrmsemployeeshiftpreferences: hrmsemployeeshiftpreference[]=[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatehrmsshiftmasters():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
      hrmsemployeeshifts: this.hrmsemployeeshifts.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
      hrmsemployeeshiftpreferences: this.hrmsemployeeshiftpreferences.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
    };
    return this.http.post(AppConstants.ntirehrmsURL + '/hrmsshiftmaster', body);
  }
  }

  saveOrUpdatehrmsshiftmastersList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntirehrmsURL + '/hrmsshiftmaster', body);
  }
  }

  gethrmsshiftmastersList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsshiftmaster').toPromise();
  }
  }
  getListByshiftid(shiftid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsshiftmaster'+'/shiftid/'+shiftid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsshiftmaster'+'/param/'+key).toPromise();
  }
  }


  gethrmsshiftmastersByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsshiftmaster'+'/e/'+id).toPromise();
  }
  }
  gethrmsshiftmastersByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsshiftmaster'+'/'+id).toPromise();
  }
  }

  deletehrmsshiftmaster(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntirehrmsURL + '/hrmsshiftmaster'+'/'+id).toPromise();
  }
  }
clearList(){
this.hrmsemployeeshifts = [];
this.hrmsemployeeshiftpreferences = [];
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntirehrmsURL + '/hrmsshiftmaster')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

