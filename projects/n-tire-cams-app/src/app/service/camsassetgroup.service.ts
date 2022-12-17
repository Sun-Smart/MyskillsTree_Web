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
    return this.http.post(AppConstants.ntirecamsURL + '/camsassetgroup', body);
  }
  }

  saveOrUpdatecamsassetgroupsList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntirecamsURL + '/camsassetgroup', body);
  }
  }

  getcamsassetgroupsList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecamsURL + '/camsassetgroup').toPromise();
  }
  }
  getListByassetgroupid(assetgroupid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecamsURL + '/camsassetgroup'+'/assetgroupid/'+assetgroupid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecamsURL + '/camsassetgroup'+'/param/'+key).toPromise();
  }
  }


  getcamsassetgroupsByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecamsURL + '/camsassetgroup'+'/e/'+id).toPromise();
  }
  }
  getcamsassetgroupsByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecamsURL + '/camsassetgroup'+'/'+id).toPromise();
  }
  }

  deletecamsassetgroup(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntirecamsURL + '/camsassetgroup'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntirecamsURL + '/camsassetgroup')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

