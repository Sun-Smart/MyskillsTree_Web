import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { boservice } from '../model/boservice.model';
import { hlpserviceavailability } from '../../../../n-tire-help-desk-app/src/app/model/hlpserviceavailability.model';
import { environment } from '../../environments/environment';
import { IboserviceResponse } from '../model/boservice.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../shared/helper'
import { SessionService } from '../pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class boserviceService {
  formData: boservice;
  readonly rootURL = AppConstants.baseURL;
  list: boservice[];
  hlpserviceavailabilities: hlpserviceavailability[]=[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdateboservices():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
      hlpserviceavailabilities: this.hlpserviceavailabilities.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
    };
    return this.http.post(AppConstants.ntireboURL + '/boservice', body);
  }
  }

  saveOrUpdateboservicesList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntireboURL + '/boservice', body);
  }
  }

  getboservicesList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/boservice').toPromise();
  }
  }
  getListByserviceid(serviceid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/boservice'+'/serviceid/'+serviceid).toPromise();
  }
  }

  getListBysourcereference(sourcereference:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/boservice'+'/sourcereference/'+sourcereference).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/boservice'+'/param/'+key).toPromise();
  }
  }


  getboservicesByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/boservice'+'/e/'+id).toPromise();
  }
  }
  getboservicesByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/boservice'+'/'+id).toPromise();
  }
  }

  deleteboservice(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntireboURL + '/boservice'+'/'+id).toPromise();
  }
  }
clearList(){
this.hlpserviceavailabilities = [];
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntireboURL + '/boservice')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

