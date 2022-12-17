import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lmsopportunityproduct } from '../model/lmsopportunityproduct.model';
import { environment } from '../../environments/environment';
import { IlmsopportunityproductResponse } from '../model/lmsopportunityproduct.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class lmsopportunityproductService {
  formData: lmsopportunityproduct;
  readonly rootURL = AppConstants.baseURL;
  list: lmsopportunityproduct[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatelmsopportunityproducts():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntirecrmURL + '/lmsopportunityproduct', body);
  }
  }

  saveOrUpdatelmsopportunityproductsList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntirecrmURL + '/lmsopportunityproduct', body);
  }
  }

  getlmsopportunityproductsList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecrmURL + '/lmsopportunityproduct').toPromise();
  }
  }
  getListByopportunityproductid(opportunityproductid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecrmURL + '/lmsopportunityproduct'+'/opportunityproductid/'+opportunityproductid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecrmURL + '/lmsopportunityproduct'+'/param/'+key).toPromise();
  }
  }


  getlmsopportunityproductsByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecrmURL + '/lmsopportunityproduct'+'/e/'+id).toPromise();
  }
  }
  getlmsopportunityproductsByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecrmURL + '/lmsopportunityproduct'+'/'+id).toPromise();
  }
  }

  deletelmsopportunityproduct(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntirecrmURL + '/lmsopportunityproduct'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntirecrmURL + '/lmsopportunityproduct')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

