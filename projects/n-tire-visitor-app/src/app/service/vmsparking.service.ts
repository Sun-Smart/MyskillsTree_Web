import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { vmsparking } from '../model/vmsparking.model';
import { environment } from '../../environments/environment';
import { IvmsparkingResponse } from '../model/vmsparking.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class vmsparkingService {
  formData: vmsparking;
  readonly rootURL = AppConstants.baseURL;
  list: vmsparking[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatevmsparkings():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntirevisitorURL + '/vmsparking', body);
  }
  }

  saveOrUpdatevmsparkingsList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntirevisitorURL + '/vmsparking', body);
  }
  }

  getvmsparkingsList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirevisitorURL + '/vmsparking').toPromise();
  }
  }
  getListByparkingid(parkingid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirevisitorURL + '/vmsparking'+'/parkingid/'+parkingid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirevisitorURL + '/vmsparking'+'/param/'+key).toPromise();
  }
  }


  getvmsparkingsByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirevisitorURL + '/vmsparking'+'/e/'+id).toPromise();
  }
  }
  getvmsparkingsByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirevisitorURL + '/vmsparking'+'/'+id).toPromise();
  }
  }

  deletevmsparking(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntirevisitorURL + '/vmsparking'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntirevisitorURL + '/vmsparking')
.toPromise()
.then(res => this.list = res as any[]);
}
}
search(filter: {name: string} = {name: ''}, page = 1): Observable<IvmsparkingResponse> {
return this.http.get<IvmsparkingResponse>(AppConstants.ntirevisitorURL+'/vmsparking')
.pipe(
tap((response: IvmsparkingResponse) => {
console.log(response);
//debugger;
var response1;
response1=response;
response.results = response1.map(vmsparking => new vmsparking(vmsparking.parkingid,vmsparking.parkingslot,vmsparking.status))
// Not filtering in the server since in-memory-web-api has somewhat restricted api
.filter(vmsparking => vmsparking.parkingslot.includes(filter.name))

return response;
})
);
}



}

