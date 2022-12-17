import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { hrmssalarymaster } from '../model/hrmssalarymaster.model';
import { hrmssalaryannualincome } from '../model/hrmssalaryannualincome.model';
import { hrmssalaryregulardeduction } from '../model/hrmssalaryregulardeduction.model';
import { hrmssalaryregularincome } from '../model/hrmssalaryregularincome.model';
import { environment } from '../../environments/environment';
import { IhrmssalarymasterResponse } from '../model/hrmssalarymaster.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class hrmssalarymasterService {
  formData: hrmssalarymaster;
  readonly rootURL = AppConstants.baseURL;
  list: hrmssalarymaster[];
  hrmssalaryannualincomes: hrmssalaryannualincome[]=[];
  hrmssalaryregulardeductions: hrmssalaryregulardeduction[]=[];
  hrmssalaryregularincomes: hrmssalaryregularincome[]=[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatehrmssalarymasters():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
      hrmssalaryannualincomes: this.hrmssalaryannualincomes.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
      hrmssalaryregulardeductions: this.hrmssalaryregulardeductions.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
      hrmssalaryregularincomes: this.hrmssalaryregularincomes.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
    };
    return this.http.post(AppConstants.ntirehrmsURL + '/hrmssalarymaster', body);
  }
  }

  saveOrUpdatehrmssalarymastersList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntirehrmsURL + '/hrmssalarymaster', body);
  }
  }

  gethrmssalarymastersList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmssalarymaster').toPromise();
  }
  }
  getListBysalarymasterid(salarymasterid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmssalarymaster'+'/salarymasterid/'+salarymasterid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmssalarymaster'+'/param/'+key).toPromise();
  }
  }


  gethrmssalarymastersByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmssalarymaster'+'/e/'+id).toPromise();
  }
  }
  gethrmssalarymastersByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmssalarymaster'+'/'+id).toPromise();
  }
  }

  deletehrmssalarymaster(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntirehrmsURL + '/hrmssalarymaster'+'/'+id).toPromise();
  }
  }
clearList(){
this.hrmssalaryannualincomes = [];
this.hrmssalaryregulardeductions = [];
this.hrmssalaryregularincomes = [];
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntirehrmsURL + '/hrmssalarymaster')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

