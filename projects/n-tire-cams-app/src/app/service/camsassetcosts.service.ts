import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { camsassetcosts } from '../model/camsassetcosts.model';
import { environment } from '../../environments/environment';
import { IcamsassetcostsResponse } from '../model/camsassetcosts.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class camsassetcostsService {
  formData: camsassetcosts;
  readonly rootURL = AppConstants.ntirecamsURL;
  list: camsassetcosts[];

  constructor(private http: HttpClient,public sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatecamsassetcosts():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntirecamsURL + '/camsassetcosts', body);
  }
  }

  saveOrUpdatecamsassetcostsList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntirecamsURL + '/camsassetcosts', body);
  }
  }

  getcamsassetcostsList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecamsURL + '/camsassetcosts').toPromise();
  }
  }
  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecamsURL + '/camsassetcosts'+'/param/'+key).toPromise();
  }
  }


  getcamsassetcostsByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecamsURL + '/camsassetcosts'+'/e/'+id).toPromise();
  }
  }
  getcamsassetcostsByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecamsURL + '/camsassetcosts'+'/'+id).toPromise();
  }
  }

  deletecamsassetcosts(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntirecamsURL + '/camsassetcosts'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntirecamsURL + '/camsassetcosts')
.toPromise()
.then((res:any) => this.list = res as any[]);
}
}


}

