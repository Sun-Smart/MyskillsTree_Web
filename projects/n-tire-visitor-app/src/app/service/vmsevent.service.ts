import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { vmsevent } from '../model/vmsevent.model';
import { environment } from '../../environments/environment';
import { IvmseventResponse } from '../model/vmsevent.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class vmseventService {
  formData: vmsevent;
  readonly rootURL = AppConstants.baseURL;
  list: vmsevent[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatevmsevents():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntirevisitorURL + '/vmsevent', body);
  }
  }

  saveOrUpdatevmseventsList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntirevisitorURL + '/vmsevent', body);
  }
  }

  getvmseventsList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirevisitorURL + '/vmsevent').toPromise();
  }
  }
  getListByeventid(eventid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirevisitorURL + '/vmsevent'+'/eventid/'+eventid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirevisitorURL + '/vmsevent'+'/param/'+key).toPromise();
  }
  }


  getvmseventsByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirevisitorURL + '/vmsevent'+'/e/'+id).toPromise();
  }
  }
  getvmseventsByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirevisitorURL + '/vmsevent'+'/'+id).toPromise();
  }
  }

  deletevmsevent(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntirevisitorURL + '/vmsevent'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntirevisitorURL + '/vmsevent')
.toPromise()
.then(res => this.list = res as any[]);
}
}
search(filter: {name: string} = {name: ''}, page = 1): Observable<IvmseventResponse> {
return this.http.get<IvmseventResponse>(AppConstants.ntirevisitorURL+'/vmsevent')
.pipe(
tap((response: IvmseventResponse) => {
console.log(response);
//debugger;
var response1;
response1=response;
response.results = response1.map(vmsevent => new vmsevent(vmsevent.eventid,vmsevent.eventreference,vmsevent.loginimage,vmsevent.loginpage,vmsevent.notes,vmsevent.status))
// Not filtering in the server since in-memory-web-api has somewhat restricted api
.filter(vmsevent => vmsevent.eventreference.includes(filter.name))

return response;
})
);
}



}

