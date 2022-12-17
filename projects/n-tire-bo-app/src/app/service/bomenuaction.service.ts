import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { bomenuaction } from '../model/bomenuaction.model';
import { environment } from '../../environments/environment';
import { IbomenuactionResponse } from '../model/bomenuaction.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../shared/helper'
import { SessionService } from '../pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class bomenuactionService {
  formData: bomenuaction;
  readonly rootURL = AppConstants.baseURL;
  list: bomenuaction[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatebomenuactions():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntireboURL + '/bomenuaction', body);
  }
  }

  saveOrUpdatebomenuactionsList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntireboURL + '/bomenuaction', body);
  }
  }

  getbomenuactionsList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/bomenuaction').toPromise();
  }
  }
  getListByactionid(actionid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/bomenuaction'+'/actionid/'+actionid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/bomenuaction'+'/param/'+key).toPromise();
  }
  }


  getbomenuactionsByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/bomenuaction'+'/e/'+id).toPromise();
  }
  }
  getbomenuactionsByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/bomenuaction'+'/'+id).toPromise();
  }
  }

  deletebomenuaction(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntireboURL + '/bomenuaction'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntireboURL + '/bomenuaction')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

