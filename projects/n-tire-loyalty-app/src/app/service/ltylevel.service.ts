import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ltylevel } from '../model/ltylevel.model';
import { ltycustomerlevel } from '../model/ltycustomerlevel.model';
import { environment } from '../../environments/environment';
import { IltylevelResponse } from '../model/ltylevel.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class ltylevelService {
  formData: ltylevel;
  readonly rootURL = AppConstants.baseURL;
  list: ltylevel[];
  ltycustomerlevels: ltycustomerlevel[]=[];
  Insertltycustomerlevels: ltycustomerlevel[]=[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdateltylevels():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
      ltycustomerlevels: this.Insertltycustomerlevels.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
    };
    return this.http.post(AppConstants.ntireloyaltyURL + '/ltylevel', body);
  }
  }

  saveOrUpdateltylevelsList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntireloyaltyURL + '/ltylevel', body);
  }
  }

  getltylevelsList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireloyaltyURL + '/ltylevel').toPromise();
  }
  }
  getListBylevelid(levelid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireloyaltyURL + '/ltylevel'+'/levelid/'+levelid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireloyaltyURL + '/ltylevel'+'/param/'+key).toPromise();
  }
  }


  getltylevelsByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireloyaltyURL + '/ltylevel'+'/e/'+id).toPromise();
  }
  }
  getltylevelsByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireloyaltyURL + '/ltylevel'+'/'+id).toPromise();
  }
  }

  deleteltylevel(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntireloyaltyURL + '/ltylevel'+'/'+id).toPromise();
  }
  }
clearList(){
this.ltycustomerlevels = [];
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntireloyaltyURL + '/ltylevel')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

