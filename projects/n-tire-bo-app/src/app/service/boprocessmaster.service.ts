import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { boprocessmaster } from '../model/boprocessmaster.model';
import { boprocessform } from '../model/boprocessform.model';
import { environment } from '../../environments/environment';
import { IboprocessmasterResponse } from '../model/boprocessmaster.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../shared/helper'
import { SessionService } from '../pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class boprocessmasterService {
  formData: boprocessmaster;
  readonly rootURL = AppConstants.baseURL;
  boprocessforms: boprocessform[]=[];
  list: boprocessmaster[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdateboprocessmasters():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
      boprocessforms: this.boprocessforms.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
    };
    return this.http.post(AppConstants.ntireboURL + '/boprocessmaster', body);
  }
  }

  saveOrUpdateboprocessmastersList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntireboURL + '/boprocessmaster', body);
  }
  }

  getboprocessmastersList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/boprocessmaster').toPromise();
  }
  }
  getListByprocessmasterid(processmasterid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/boprocessmaster'+'/processmasterid/'+processmasterid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/boprocessmaster'+'/param/'+key).toPromise();
  }
  }


  getboprocessmastersByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/boprocessmaster'+'/e/'+id).toPromise();
  }
  }
  getboprocessmastersByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/boprocessmaster'+'/'+id).toPromise();
  }
  }

  deleteboprocessmaster(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntireboURL + '/boprocessmaster'+'/'+id).toPromise();
  }
  }
clearList(){
this.boprocessforms = [];
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntireboURL + '/boprocessmaster')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

