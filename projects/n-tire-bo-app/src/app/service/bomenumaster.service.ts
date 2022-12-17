import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { bomenumaster } from '../model/bomenumaster.model';
import { bomenuaction } from '../model/bomenuaction.model';
import { environment } from '../../environments/environment';
import { IbomenumasterResponse } from '../model/bomenumaster.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../shared/helper'
import { SessionService } from '../pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class bomenumasterService {
  formData: bomenumaster;
  readonly rootURL = AppConstants.baseURL;
  list: bomenumaster[];
  bomenuactions: bomenuaction[]=[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatebomenumasters():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
      bomenuactions: this.bomenuactions.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
    };
    return this.http.post(AppConstants.ntireboURL + '/bomenumaster', body);
  }
  }

  saveOrUpdatebomenumastersList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntireboURL + '/bomenumaster', body);
  }
  }

  getbomenumastersList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/bomenumaster').toPromise();
  }
  }
  getListBymenuid(menuid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/bomenumaster'+'/menuid/'+menuid).toPromise();
  }
  }

  getListBymenuurl(menuurl:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/bomenumaster'+'/menuurl/'+menuurl).toPromise();
  }
  }

  getListBymenucode(menucode:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/bomenumaster'+'/menucode/'+menucode).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/bomenumaster'+'/param/'+key).toPromise();
  }
  }


  getbomenumastersByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/bomenumaster'+'/e/'+id).toPromise();
  }
  }
  getbomenumastersByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/bomenumaster'+'/'+id).toPromise();
  }
  }

  deletebomenumaster(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntireboURL + '/bomenumaster'+'/'+id).toPromise();
  }
  }
clearList(){
this.bomenuactions = [];
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntireboURL + '/bomenumaster')
.toPromise()
.then(res => this.list = res as any[]);
}
}
getbousermenumasterList(param:any=0):any {
if (this.valid()){ 
return this.http.get(AppConstants.ntireboURL + '/bomenumaster/bousermenumaster/'+param).toPromise();
}
}


}

