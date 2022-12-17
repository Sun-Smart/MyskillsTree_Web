import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { hrmsemployeemonthlysalaryregulardeduction } from '../model/hrmsemployeemonthlysalaryregulardeduction.model';
import { environment } from '../../environments/environment';
import { IhrmsemployeemonthlysalaryregulardeductionResponse } from '../model/hrmsemployeemonthlysalaryregulardeduction.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class hrmsemployeemonthlysalaryregulardeductionService {
  formData: hrmsemployeemonthlysalaryregulardeduction;
  readonly rootURL = AppConstants.baseURL;
  list: hrmsemployeemonthlysalaryregulardeduction[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatehrmsemployeemonthlysalaryregulardeductions():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntirehrmsURL + '/hrmsemployeemonthlysalaryregulardeduction', body);
  }
  }

  saveOrUpdatehrmsemployeemonthlysalaryregulardeductionsList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntirehrmsURL + '/hrmsemployeemonthlysalaryregulardeduction', body);
  }
  }

  gethrmsemployeemonthlysalaryregulardeductionsList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeemonthlysalaryregulardeduction').toPromise();
  }
  }
  getListBypkid(pkid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeemonthlysalaryregulardeduction'+'/pkid/'+pkid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeemonthlysalaryregulardeduction'+'/param/'+key).toPromise();
  }
  }


  gethrmsemployeemonthlysalaryregulardeductionsByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeemonthlysalaryregulardeduction'+'/e/'+id).toPromise();
  }
  }
  gethrmsemployeemonthlysalaryregulardeductionsByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeemonthlysalaryregulardeduction'+'/'+id).toPromise();
  }
  }

  deletehrmsemployeemonthlysalaryregulardeduction(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntirehrmsURL + '/hrmsemployeemonthlysalaryregulardeduction'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeemonthlysalaryregulardeduction')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

