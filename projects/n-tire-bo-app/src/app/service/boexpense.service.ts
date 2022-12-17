import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { boexpense } from '../model/boexpense.model';
import { environment } from '../../environments/environment';
import { IboexpenseResponse } from '../model/boexpense.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../shared/helper'
import { SessionService } from '../pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class boexpenseService {
  formData: boexpense;
  readonly rootURL = AppConstants.baseURL;
  list: boexpense[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdateboexpenses():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntireboURL + '/boexpense', body);
  }
  }

  saveOrUpdateboexpensesList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntireboURL + '/boexpense', body);
  }
  }

  getboexpensesList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/boexpense').toPromise();
  }
  }
  getListByexpenseid(expenseid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/boexpense'+'/expenseid/'+expenseid).toPromise();
  }
  }

  getListBysourcereference(sourcereference:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/boexpense'+'/sourcereference/'+sourcereference).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/boexpense'+'/param/'+key).toPromise();
  }
  }


  getboexpensesByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/boexpense'+'/e/'+id).toPromise();
  }
  }
  getboexpensesByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/boexpense'+'/'+id).toPromise();
  }
  }

  deleteboexpense(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntireboURL + '/boexpense'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntireboURL + '/boexpense')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

