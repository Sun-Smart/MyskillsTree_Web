import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { prjrelease } from '../model/prjrelease.model';
import { prjreleaseteamresponse } from '../model/prjreleaseteamresponse.model';
import { environment } from '../../environments/environment';
import { IprjreleaseResponse } from '../model/prjrelease.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class prjreleaseService {
  formData: prjrelease;
  readonly rootURL = AppConstants.ntireprojectURL;
  prjreleaseteamresponses: prjreleaseteamresponse[]=[];
  list: prjrelease[];

  constructor(private http: HttpClient,public sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdateprjreleases():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
      prjreleaseteamresponses: this.prjreleaseteamresponses.filter(function(el) { return el!=undefined && Object.keys(el).length!=0; }),
    };
    return this.http.post(this.rootURL + '/prjrelease', body);
  }
  }

  saveOrUpdateprjreleasesList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(this.rootURL + '/prjrelease', body);
  }
  }

  getprjreleasesList():any {
  if (this.valid()){ 
    return this.http.get(this.rootURL + '/prjrelease').toPromise();
  }
  }
  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(this.rootURL + '/prjrelease'+'/param/'+key).toPromise();
  }
  }


  getprjreleasesByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(this.rootURL + '/prjrelease'+'/e/'+id).toPromise();
  }
  }
  getprjreleasesByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(this.rootURL + '/prjrelease'+'/'+id).toPromise();
  }
  }

  deleteprjrelease(id:number):any {
  if (this.valid()){ 
    return this.http.delete(this.rootURL + '/prjrelease'+'/'+id).toPromise();
  }
  }
clearList(){
this.prjreleaseteamresponses = [];
}
refreshList():any{
  if (this.valid()){ 
this.http.get(this.rootURL + '/prjrelease')
.toPromise()
.then((res:any) => this.list = res as any[]);
}
}


}

