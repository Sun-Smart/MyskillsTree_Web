import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ltysegment } from '../model/ltysegment.model';
import { environment } from '../../environments/environment';
import { IltysegmentResponse } from '../model/ltysegment.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class ltysegmentService {
  formData: ltysegment;
  readonly rootURL = AppConstants.ntireloyaltyURL;
  list: ltysegment[];

  constructor(private http: HttpClient,public sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdateltysegments():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(this.rootURL + '/ltysegment', body);
  }
  }

  saveOrUpdateltysegmentsList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(this.rootURL + '/ltysegment', body);
  }
  }

  getltysegmentsList():any {
  if (this.valid()){ 
    return this.http.get(this.rootURL + '/ltysegment').toPromise();
  }
  }
  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(this.rootURL + '/ltysegment'+'/param/'+key).toPromise();
  }
  }


  getltysegmentsByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(this.rootURL + '/ltysegment'+'/e/'+id).toPromise();
  }
  }
  getltysegmentsByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(this.rootURL + '/ltysegment'+'/'+id).toPromise();
  }
  }

  deleteltysegment(id:number):any {
  if (this.valid()){ 
    return this.http.delete(this.rootURL + '/ltysegment'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(this.rootURL + '/ltysegment')
.toPromise()
.then((res:any) => this.list = res as any[]);
}
}


}

