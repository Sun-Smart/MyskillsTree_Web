import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { prjconfigurationitem } from '../model/prjconfigurationitem.model';
import { environment } from '../../environments/environment';
import { IprjconfigurationitemResponse } from '../model/prjconfigurationitem.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class prjconfigurationitemService {
  formData: prjconfigurationitem;
  readonly rootURL = AppConstants.ntireprojectURL;
  list: prjconfigurationitem[];

  constructor(private http: HttpClient,public sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdateprjconfigurationitems():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(this.rootURL + '/prjconfigurationitem', body);
  }
  }

  saveOrUpdateprjconfigurationitemsList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(this.rootURL + '/prjconfigurationitem', body);
  }
  }

  getprjconfigurationitemsList():any {
  if (this.valid()){ 
    return this.http.get(this.rootURL + '/prjconfigurationitem').toPromise();
  }
  }
  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(this.rootURL + '/prjconfigurationitem'+'/param/'+key).toPromise();
  }
  }


  getprjconfigurationitemsByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(this.rootURL + '/prjconfigurationitem'+'/e/'+id).toPromise();
  }
  }
  getprjconfigurationitemsByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(this.rootURL + '/prjconfigurationitem'+'/'+id).toPromise();
  }
  }

  deleteprjconfigurationitem(id:number):any {
  if (this.valid()){ 
    return this.http.delete(this.rootURL + '/prjconfigurationitem'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(this.rootURL + '/prjconfigurationitem')
.toPromise()
.then((res:any) => this.list = res as any[]);
}
}


}

