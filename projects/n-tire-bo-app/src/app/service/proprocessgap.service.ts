import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { proprocessgap } from '../model/proprocessgap.model';
import { environment } from '../../environments/environment';
import { IproprocessgapResponse } from '../model/proprocessgap.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../shared/helper'
import { SessionService } from '../pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class proprocessgapService {
  formData: proprocessgap;
  readonly rootURL = AppConstants.baseURL;
  list: proprocessgap[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdateproprocessgaps():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntireboURL + '/proprocessgap', body);
  }
  }

  saveOrUpdateproprocessgapsList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntireboURL + '/proprocessgap', body);
  }
  }

  getproprocessgapsList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/proprocessgap').toPromise();
  }
  }
  getListBygapid(gapid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/proprocessgap'+'/gapid/'+gapid).toPromise();
  }
  }

  getListBysourcereference(sourcereference:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/proprocessgap'+'/sourcereference/'+sourcereference).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/proprocessgap'+'/param/'+key).toPromise();
  }
  }


  getproprocessgapsByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/proprocessgap'+'/e/'+id).toPromise();
  }
  }
  getproprocessgapsByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/proprocessgap'+'/'+id).toPromise();
  }
  }

  deleteproprocessgap(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntireboURL + '/proprocessgap'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntireboURL + '/proprocessgap')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

