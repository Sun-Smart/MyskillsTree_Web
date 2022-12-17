import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { bofinancialyear } from '../model/bofinancialyear.model';
import { environment } from '../../environments/environment';
import { IbofinancialyearResponse } from '../model/bofinancialyear.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../shared/helper'
import { SessionService } from '../pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class bofinancialyearService {
  formData: bofinancialyear;
  readonly rootURL = AppConstants.baseURL;
  list: bofinancialyear[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatebofinancialyears():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntireboURL + '/bofinancialyear', body);
  }
  }

  saveOrUpdatebofinancialyearsList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntireboURL + '/bofinancialyear', body);
  }
  }

  getbofinancialyearsList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/bofinancialyear').toPromise();
  }
  }
  getListByfinyearid(finyearid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/bofinancialyear'+'/finyearid/'+finyearid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/bofinancialyear'+'/param/'+key).toPromise();
  }
  }


  getbofinancialyearsByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/bofinancialyear'+'/e/'+id).toPromise();
  }
  }
  getbofinancialyearsByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/bofinancialyear'+'/'+id).toPromise();
  }
  }

  deletebofinancialyear(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntireboURL + '/bofinancialyear'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntireboURL + '/bofinancialyear')
.toPromise()
.then(res => this.list = res as any[]);
}
}
search(filter: {name: string} = {name: ''}, page = 1): Observable<IbofinancialyearResponse> {
return this.http.get<IbofinancialyearResponse>(AppConstants.ntireboURL+'/bofinancialyear')
.pipe(
tap((response: IbofinancialyearResponse) => {
console.log(response);
//debugger;
var response1;
response1=response;
response.results = response1.map(bofinancialyear => new bofinancialyear(bofinancialyear.finyearid,bofinancialyear.finyearname,bofinancialyear.startdate,bofinancialyear.enddate,bofinancialyear.currentyear,bofinancialyear.status))
// Not filtering in the server since in-memory-web-api has somewhat restricted api
.filter(bofinancialyear => bofinancialyear.finyearname.includes(filter.name))

return response;
})
);
}



}

