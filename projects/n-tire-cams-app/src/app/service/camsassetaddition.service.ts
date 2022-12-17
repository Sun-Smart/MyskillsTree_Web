import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { camsassetaddition } from '../model/camsassetaddition.model';
import { environment } from '../../environments/environment';
import { IcamsassetadditionResponse } from '../model/camsassetaddition.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class camsassetadditionService {
  formData: camsassetaddition;
  readonly rootURL = AppConstants.baseURL;
  list: camsassetaddition[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatecamsassetadditions():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntirecamsURL + '/camsassetaddition', body);
  }
  }

  saveOrUpdatecamsassetadditionsList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntirecamsURL + '/camsassetaddition', body);
  }
  }

  getcamsassetadditionsList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecamsURL + '/camsassetaddition').toPromise();
  }
  }
  getListByadditionid(additionid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecamsURL + '/camsassetaddition'+'/additionid/'+additionid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecamsURL + '/camsassetaddition'+'/param/'+key).toPromise();
  }
  }


  getcamsassetadditionsByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecamsURL + '/camsassetaddition'+'/e/'+id).toPromise();
  }
  }
  getcamsassetadditionsByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecamsURL + '/camsassetaddition'+'/'+id).toPromise();
  }
  }

  deletecamsassetaddition(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntirecamsURL + '/camsassetaddition'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntirecamsURL + '/camsassetaddition')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

