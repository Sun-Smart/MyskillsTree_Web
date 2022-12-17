import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { camsassetgroup } from '../model/camsassetgroup.model';
import { environment } from '../../environments/environment';
import { IcamsassetgroupResponse } from '../model/camsassetgroup.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class camsassetgroupService {
  formData: camsassetgroup;
  readonly rootURL = AppConstants.baseURL;
  list: camsassetgroup[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatecamsassetgroups():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(this.rootURL + '/camsassetgroup', body);
  }
  }

  saveOrUpdatecamsassetgroupsList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(this.rootURL + '/camsassetgroup', body);
  }
  }

  getcamsassetgroupsList():any {
  if (this.valid()){ 
    return this.http.get(this.rootURL + '/camsassetgroup').toPromise();
  }
  }
  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(this.rootURL + '/camsassetgroup'+'/param/'+key).toPromise();
  }
  }


  getcamsassetgroupsByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(this.rootURL + '/camsassetgroup'+'/e/'+id).toPromise();
  }
  }
  getcamsassetgroupsByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(this.rootURL + '/camsassetgroup'+'/'+id).toPromise();
  }
  }

  deletecamsassetgroup(id:number):any {
  if (this.valid()){ 
    return this.http.delete(this.rootURL + '/camsassetgroup'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(this.rootURL + '/camsassetgroup')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

