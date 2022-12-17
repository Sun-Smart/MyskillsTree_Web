import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { bosubconfigvalue } from '../model/bosubconfigvalue.model';
import { environment } from '../../environments/environment';
import { IbosubconfigvalueResponse } from '../model/bosubconfigvalue.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../shared/helper'
import { SessionService } from '../pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class bosubconfigvalueService {
  formData: bosubconfigvalue;
  readonly rootURL = AppConstants.baseURL;
  list: bosubconfigvalue[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatebosubconfigvalues():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntireboURL + '/bosubconfigvalue', body);
  }
  }

  saveOrUpdatebosubconfigvaluesList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntireboURL + '/bosubconfigvalue', body);
  }
  }

  getbosubconfigvaluesList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/bosubconfigvalue').toPromise();
  }
  }
  getListBysubcategoryid(subcategoryid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/bosubconfigvalue'+'/subcategoryid/'+subcategoryid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/bosubconfigvalue'+'/param/'+key).toPromise();
  }
  }


  getbosubconfigvaluesByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/bosubconfigvalue'+'/e/'+id).toPromise();
  }
  }
  getbosubconfigvaluesByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/bosubconfigvalue'+'/'+id).toPromise();
  }
  }

  deletebosubconfigvalue(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntireboURL + '/bosubconfigvalue'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntireboURL + '/bosubconfigvalue')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

