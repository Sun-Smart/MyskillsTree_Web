import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { hrmsemployeesalarymaster } from '../model/hrmsemployeesalarymaster.model';
import { hrmssalaryemployeeannualincome } from '../model/hrmssalaryemployeeannualincome.model';
import { hrmssalaryemployeeregulardeduction } from '../model/hrmssalaryemployeeregulardeduction.model';
import { hrmssalaryemployeeregularincome } from '../model/hrmssalaryemployeeregularincome.model';
import { environment } from '../../environments/environment';
import { IhrmsemployeesalarymasterResponse } from '../model/hrmsemployeesalarymaster.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class hrmsemployeesalarymasterService {
  formData: hrmsemployeesalarymaster;
  readonly rootURL = AppConstants.baseURL;
  list: hrmsemployeesalarymaster[];
  hrmssalaryemployeeannualincomes: hrmssalaryemployeeannualincome[]=[];
  hrmssalaryemployeeregulardeductions: hrmssalaryemployeeregulardeduction[]=[];
  hrmssalaryemployeeregularincomes: hrmssalaryemployeeregularincome[]=[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatehrmsemployeesalarymasters():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
      hrmssalaryemployeeannualincomes: this.hrmssalaryemployeeannualincomes.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
      hrmssalaryemployeeregulardeductions: this.hrmssalaryemployeeregulardeductions.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
      hrmssalaryemployeeregularincomes: this.hrmssalaryemployeeregularincomes.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
    };
    return this.http.post(AppConstants.ntirehrmsURL + '/hrmsemployeesalarymaster', body);
  }
  }

  saveOrUpdatehrmsemployeesalarymastersList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntirehrmsURL + '/hrmsemployeesalarymaster', body);
  }
  }

  gethrmsemployeesalarymastersList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeesalarymaster').toPromise();
  }
  }
  getListBysalarymasterid(salarymasterid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeesalarymaster'+'/salarymasterid/'+salarymasterid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeesalarymaster'+'/param/'+key).toPromise();
  }
  }


  gethrmsemployeesalarymastersByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeesalarymaster'+'/e/'+id).toPromise();
  }
  }
  gethrmsemployeesalarymastersByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeesalarymaster'+'/'+id).toPromise();
  }
  }

  deletehrmsemployeesalarymaster(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntirehrmsURL + '/hrmsemployeesalarymaster'+'/'+id).toPromise();
  }
  }
clearList(){
this.hrmssalaryemployeeannualincomes = [];
this.hrmssalaryemployeeregulardeductions = [];
this.hrmssalaryemployeeregularincomes = [];
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeesalarymaster')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

