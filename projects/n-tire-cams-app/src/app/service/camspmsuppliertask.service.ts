import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { camspmsuppliertask } from '../model/camspmsuppliertask.model';
import { environment } from '../../environments/environment';
import { IcamspmsuppliertaskResponse } from '../model/camspmsuppliertask.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class camspmsuppliertaskService {
  formData: camspmsuppliertask;
  readonly rootURL = AppConstants.baseURL;
  list: camspmsuppliertask[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatecamspmsuppliertasks():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntirecamsURL + '/camspmsuppliertask', body);
  }
  }

  saveOrUpdatecamspmsuppliertasksList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntirecamsURL + '/camspmsuppliertask', body);
  }
  }

  getcamspmsuppliertasksList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecamsURL + '/camspmsuppliertask').toPromise();
  }
  }
  getListBypmsupplierid(pmsupplierid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecamsURL + '/camspmsuppliertask'+'/pmsupplierid/'+pmsupplierid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecamsURL + '/camspmsuppliertask'+'/param/'+key).toPromise();
  }
  }


  getcamspmsuppliertasksByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecamsURL + '/camspmsuppliertask'+'/e/'+id).toPromise();
  }
  }
  getcamspmsuppliertasksByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecamsURL + '/camspmsuppliertask'+'/'+id).toPromise();
  }
  }

  deletecamspmsuppliertask(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntirecamsURL + '/camspmsuppliertask'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntirecamsURL + '/camspmsuppliertask')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

