import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { boteam } from '../model/boteam.model';
import { boteammember } from '../model/boteammember.model';
import { environment } from '../../environments/environment';
import { IboteamResponse } from '../model/boteam.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../shared/helper'
import { SessionService } from '../pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class boteamService {
  formData: boteam;
  readonly rootURL = AppConstants.baseURL;
  boteammembers: boteammember[]=[];
  list: boteam[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdateboteams():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
      boteammembers: this.boteammembers.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
    };
    return this.http.post(AppConstants.ntireboURL + '/boteam', body);
  }
  }

  saveOrUpdateboteamsList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntireboURL + '/boteam', body);
  }
  }

  getboteamsList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/boteam').toPromise();
  }
  }
  getListByteamid(teamid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/boteam'+'/teamid/'+teamid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/boteam'+'/param/'+key).toPromise();
  }
  }


  getboteamsByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/boteam'+'/e/'+id).toPromise();
  }
  }
  getboteamsByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/boteam'+'/'+id).toPromise();
  }
  }

  deleteboteam(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntireboURL + '/boteam'+'/'+id).toPromise();
  }
  }
clearList(){
this.boteammembers = [];
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntireboURL + '/boteam')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

