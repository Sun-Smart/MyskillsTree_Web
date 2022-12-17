import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { hrmsemployeegeneralwaiver } from '../model/hrmsemployeegeneralwaiver.model';
import { environment } from '../../environments/environment';
import { IhrmsemployeegeneralwaiverResponse } from '../model/hrmsemployeegeneralwaiver.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class hrmsemployeegeneralwaiverService {
  formData: hrmsemployeegeneralwaiver;
  readonly rootURL = AppConstants.baseURL;
  list: hrmsemployeegeneralwaiver[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatehrmsemployeegeneralwaivers():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntirehrmsURL + '/hrmsemployeegeneralwaiver', body);
  }
  }

  saveOrUpdatehrmsemployeegeneralwaiversList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntirehrmsURL + '/hrmsemployeegeneralwaiver', body);
  }
  }

  gethrmsemployeegeneralwaiversList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeegeneralwaiver').toPromise();
  }
  }
  getListBywaiverid(waiverid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeegeneralwaiver'+'/waiverid/'+waiverid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeegeneralwaiver'+'/param/'+key).toPromise();
  }
  }


  gethrmsemployeegeneralwaiversByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeegeneralwaiver'+'/e/'+id).toPromise();
  }
  }
  gethrmsemployeegeneralwaiversByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeegeneralwaiver'+'/'+id).toPromise();
  }
  }

  deletehrmsemployeegeneralwaiver(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntirehrmsURL + '/hrmsemployeegeneralwaiver'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeegeneralwaiver')
.toPromise()
.then(res => this.list = res as any[]);
}
}
search(filter: {name: string} = {name: ''}, page = 1): Observable<IhrmsemployeegeneralwaiverResponse> {
return this.http.get<IhrmsemployeegeneralwaiverResponse>(AppConstants.ntirehrmsURL+'/hrmsemployeegeneralwaiver')
.pipe(
tap((response: IhrmsemployeegeneralwaiverResponse) => {
console.log(response);
//debugger;
var response1;
response1=response;
response.results = response1.map(hrmsemployeegeneralwaiver => new hrmsemployeegeneralwaiver(hrmsemployeegeneralwaiver.waiverid,hrmsemployeegeneralwaiver.deductionid,hrmsemployeegeneralwaiver.deductioniddesc,hrmsemployeegeneralwaiver.employeeid,hrmsemployeegeneralwaiver.financialyear,hrmsemployeegeneralwaiver.financialyeardesc,hrmsemployeegeneralwaiver.generalwaivername,hrmsemployeegeneralwaiver.amount,hrmsemployeegeneralwaiver.status))
// Not filtering in the server since in-memory-web-api has somewhat restricted api
.filter(hrmsemployeegeneralwaiver => hrmsemployeegeneralwaiver.generalwaivername.includes(filter.name))

return response;
})
);
}



}

