import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ltycustomerlevel } from '../model/ltycustomerlevel.model';
import { environment } from '../../environments/environment';
import { IltycustomerlevelResponse } from '../model/ltycustomerlevel.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class ltycustomerlevelService {
  formData: ltycustomerlevel;
  readonly rootURL = AppConstants.baseURL;
  list: ltycustomerlevel[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdateltycustomerlevels():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntireloyaltyURL + '/ltycustomerlevel', body);
  }
  }

  saveOrUpdateltycustomerlevelsList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntireloyaltyURL + '/ltycustomerlevel', body);
  }
  }

  getltycustomerlevelsList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireloyaltyURL + '/ltycustomerlevel').toPromise();
  }
  }
  getListBycustomerlevelid(customerlevelid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireloyaltyURL + '/ltycustomerlevel'+'/customerlevelid/'+customerlevelid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireloyaltyURL + '/ltycustomerlevel'+'/param/'+key).toPromise();
  }
  }


  getltycustomerlevelsByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireloyaltyURL + '/ltycustomerlevel'+'/e/'+id).toPromise();
  }
  }
  getltycustomerlevelsByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireloyaltyURL + '/ltycustomerlevel'+'/'+id).toPromise();
  }
  }

  deleteltycustomerlevel(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntireloyaltyURL + '/ltycustomerlevel'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntireloyaltyURL + '/ltycustomerlevel')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

