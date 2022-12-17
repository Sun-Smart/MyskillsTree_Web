import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { camsassetcost } from '../model/camsassetcost.model';
import { environment } from '../../environments/environment';
import { IcamsassetcostResponse } from '../model/camsassetcost.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class camsassetcostService {
  formData: camsassetcost;
  readonly rootURL = AppConstants.baseURL;
  list: camsassetcost[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatecamsassetcosts():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntirecamsURL + '/camsassetcost', body);
  }
  }

  saveOrUpdatecamsassetcostsList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntirecamsURL + '/camsassetcost', body);
  }
  }

  getcamsassetcostsList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecamsURL + '/camsassetcost').toPromise();
  }
  }
  getListBycostid(costid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecamsURL + '/camsassetcost'+'/costid/'+costid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecamsURL + '/camsassetcost'+'/param/'+key).toPromise();
  }
  }


  getcamsassetcostsByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecamsURL + '/camsassetcost'+'/e/'+id).toPromise();
  }
  }
  getcamsassetcostsByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecamsURL + '/camsassetcost'+'/'+id).toPromise();
  }
  }

  deletecamsassetcost(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntirecamsURL + '/camsassetcost'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntirecamsURL + '/camsassetcost')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

