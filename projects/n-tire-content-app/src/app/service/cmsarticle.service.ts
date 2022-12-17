import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { cmsarticle } from '../model/cmsarticle.model';
import { environment } from '../../environments/environment';
import { IcmsarticleResponse } from '../model/cmsarticle.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class cmsarticleService {
  formData: cmsarticle;
  readonly rootURL = AppConstants.ntirecontentURL;
  list: cmsarticle[];

  constructor(private http: HttpClient,public sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatecmsarticles():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntirecontentURL + '/cmsarticle', body);
  }
  }

  saveOrUpdatecmsarticlesList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntirecontentURL + '/cmsarticle', body);
  }
  }

  getcmsarticlesList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecontentURL + '/cmsarticle').toPromise();
  }
  }
  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecontentURL + '/cmsarticle'+'/param/'+key).toPromise();
  }
  }


  getcmsarticlesByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecontentURL + '/cmsarticle'+'/e/'+id).toPromise();
  }
  }
  getcmsarticlesByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecontentURL + '/cmsarticle'+'/'+id).toPromise();
  }
  }

  deletecmsarticle(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntirecontentURL + '/cmsarticle'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntirecontentURL + '/cmsarticle')
.toPromise()
.then((res:any) => this.list = res as any[]);
}
}


}

