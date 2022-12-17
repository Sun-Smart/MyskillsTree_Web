import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { itsoftware } from '../model/itsoftware.model';
import { environment } from '../../environments/environment';
import { IitsoftwareResponse } from '../model/itsoftware.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class itsoftwareService {
  formData: itsoftware;
  readonly rootURL = AppConstants.ntireitURL;
  list: itsoftware[];

  constructor(private http: HttpClient,public sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdateitsoftwares():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntireitURL + '/itsoftware', body);
  }
  }

  saveOrUpdateitsoftwaresList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntireitURL + '/itsoftware', body);
  }
  }

  getitsoftwaresList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireitURL + '/itsoftware').toPromise();
  }
  }
  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireitURL + '/itsoftware'+'/param/'+key).toPromise();
  }
  }


  getitsoftwaresByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireitURL + '/itsoftware'+'/e/'+id).toPromise();
  }
  }
  getitsoftwaresByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireitURL + '/itsoftware'+'/'+id).toPromise();
  }
  }

  deleteitsoftware(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntireitURL + '/itsoftware'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntireitURL + '/itsoftware')
.toPromise()
.then((res:any) => this.list = res as any[]);
}
}


}

