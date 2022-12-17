import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { hrmsemployeemonthlysalaryregularincome } from '../model/hrmsemployeemonthlysalaryregularincome.model';
import { environment } from '../../environments/environment';
import { IhrmsemployeemonthlysalaryregularincomeResponse } from '../model/hrmsemployeemonthlysalaryregularincome.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class hrmsemployeemonthlysalaryregularincomeService {
  formData: hrmsemployeemonthlysalaryregularincome;
  readonly rootURL = AppConstants.baseURL;
  list: hrmsemployeemonthlysalaryregularincome[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatehrmsemployeemonthlysalaryregularincomes():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntirehrmsURL + '/hrmsemployeemonthlysalaryregularincome', body);
  }
  }

  saveOrUpdatehrmsemployeemonthlysalaryregularincomesList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntirehrmsURL + '/hrmsemployeemonthlysalaryregularincome', body);
  }
  }

  gethrmsemployeemonthlysalaryregularincomesList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeemonthlysalaryregularincome').toPromise();
  }
  }
  getListBypkid(pkid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeemonthlysalaryregularincome'+'/pkid/'+pkid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeemonthlysalaryregularincome'+'/param/'+key).toPromise();
  }
  }


  gethrmsemployeemonthlysalaryregularincomesByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeemonthlysalaryregularincome'+'/e/'+id).toPromise();
  }
  }
  gethrmsemployeemonthlysalaryregularincomesByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeemonthlysalaryregularincome'+'/'+id).toPromise();
  }
  }

  deletehrmsemployeemonthlysalaryregularincome(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntirehrmsURL + '/hrmsemployeemonthlysalaryregularincome'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeemonthlysalaryregularincome')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

