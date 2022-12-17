import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { hrmsemployeemonthlysalaryannualincome } from '../model/hrmsemployeemonthlysalaryannualincome.model';
import { environment } from '../../environments/environment';
import { IhrmsemployeemonthlysalaryannualincomeResponse } from '../model/hrmsemployeemonthlysalaryannualincome.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class hrmsemployeemonthlysalaryannualincomeService {
  formData: hrmsemployeemonthlysalaryannualincome;
  readonly rootURL = AppConstants.baseURL;
  list: hrmsemployeemonthlysalaryannualincome[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatehrmsemployeemonthlysalaryannualincomes():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntirehrmsURL + '/hrmsemployeemonthlysalaryannualincome', body);
  }
  }

  saveOrUpdatehrmsemployeemonthlysalaryannualincomesList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntirehrmsURL + '/hrmsemployeemonthlysalaryannualincome', body);
  }
  }

  gethrmsemployeemonthlysalaryannualincomesList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeemonthlysalaryannualincome').toPromise();
  }
  }
  getListBypkid(pkid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeemonthlysalaryannualincome'+'/pkid/'+pkid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeemonthlysalaryannualincome'+'/param/'+key).toPromise();
  }
  }


  gethrmsemployeemonthlysalaryannualincomesByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeemonthlysalaryannualincome'+'/e/'+id).toPromise();
  }
  }
  gethrmsemployeemonthlysalaryannualincomesByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeemonthlysalaryannualincome'+'/'+id).toPromise();
  }
  }

  deletehrmsemployeemonthlysalaryannualincome(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntirehrmsURL + '/hrmsemployeemonthlysalaryannualincome'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeemonthlysalaryannualincome')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

