import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { hrmsodrequest } from '../model/hrmsodrequest.model';
import { hrmsodadvance } from '../model/hrmsodadvance.model';
import { hrmsodclaim } from '../model/hrmsodclaim.model';
import { hrmsodtravel } from '../model/hrmsodtravel.model';
import { environment } from '../../environments/environment';
import { IhrmsodrequestResponse } from '../model/hrmsodrequest.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class hrmsodrequestService {
  formData: hrmsodrequest;
  readonly rootURL = AppConstants.baseURL;
  list: hrmsodrequest[];
  hrmsodadvances: hrmsodadvance[]=[];
  hrmsodclaims: hrmsodclaim[]=[];
  hrmsodtravels: hrmsodtravel[]=[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatehrmsodrequests():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
      hrmsodadvances: this.hrmsodadvances.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
      hrmsodclaims: this.hrmsodclaims.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
      hrmsodtravels: this.hrmsodtravels.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
    };
    return this.http.post(AppConstants.ntirehrmsURL + '/hrmsodrequest', body);
  }
  }

  saveOrUpdatehrmsodrequestsList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntirehrmsURL + '/hrmsodrequest', body);
  }
  }

  gethrmsodrequestsList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsodrequest').toPromise();
  }
  }
  getListByodid(odid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsodrequest'+'/odid/'+odid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsodrequest'+'/param/'+key).toPromise();
  }
  }


  gethrmsodrequestsByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsodrequest'+'/e/'+id).toPromise();
  }
  }
  gethrmsodrequestsByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsodrequest'+'/'+id).toPromise();
  }
  }

  deletehrmsodrequest(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntirehrmsURL + '/hrmsodrequest'+'/'+id).toPromise();
  }
  }
clearList(){
this.hrmsodadvances = [];
this.hrmsodclaims = [];
this.hrmsodtravels = [];
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntirehrmsURL + '/hrmsodrequest')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

