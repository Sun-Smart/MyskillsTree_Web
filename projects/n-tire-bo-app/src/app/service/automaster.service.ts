import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { automaster } from '../model/automaster.model';
import { autodetail } from '../model/autodetail.model';
import { environment } from '../../environments/environment';
import { IautomasterResponse } from '../model/automaster.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../shared/helper'
import { SessionService } from '../pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class automasterService {
  formData: automaster;
  readonly rootURL = AppConstants.baseURL;
  autodetails: autodetail[]=[];
  list: automaster[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdateautomasters():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
      autodetails: this.autodetails.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
    };
    return this.http.post(AppConstants.ntireboURL + '/automaster', body);
  }
  }

  saveOrUpdateautomastersList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntireboURL + '/automaster', body);
  }
  }

  getautomastersList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/automaster').toPromise();
  }
  }
  getListBymasterid(masterid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/automaster'+'/masterid/'+masterid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/automaster'+'/param/'+key).toPromise();
  }
  }


  getautomastersByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/automaster'+'/e/'+id).toPromise();
  }
  }
  getautomastersByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/automaster'+'/'+id).toPromise();
  }
  }

  deleteautomaster(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntireboURL + '/automaster'+'/'+id).toPromise();
  }
  }
clearList(){
this.autodetails = [];
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntireboURL + '/automaster')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

