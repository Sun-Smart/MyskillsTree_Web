import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { qyrelatedcomplaint } from '../model/qyrelatedcomplaint.model';
import { environment } from '../../environments/environment';
import { IqyrelatedcomplaintResponse } from '../model/qyrelatedcomplaint.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class qyrelatedcomplaintService {
  formData: qyrelatedcomplaint;
  readonly rootURL = AppConstants.baseURL;
  list: qyrelatedcomplaint[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdateqyrelatedcomplaints():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntirehelpdeskURL + '/qyrelatedcomplaint', body);
  }
  }

  saveOrUpdateqyrelatedcomplaintsList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntirehelpdeskURL + '/qyrelatedcomplaint', body);
  }
  }

  getqyrelatedcomplaintsList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehelpdeskURL + '/qyrelatedcomplaint').toPromise();
  }
  }
  getListByrelatedid(relatedid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehelpdeskURL + '/qyrelatedcomplaint'+'/relatedid/'+relatedid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehelpdeskURL + '/qyrelatedcomplaint'+'/param/'+key).toPromise();
  }
  }


  getqyrelatedcomplaintsByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehelpdeskURL + '/qyrelatedcomplaint'+'/e/'+id).toPromise();
  }
  }
  getqyrelatedcomplaintsByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehelpdeskURL + '/qyrelatedcomplaint'+'/'+id).toPromise();
  }
  }

  deleteqyrelatedcomplaint(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntirehelpdeskURL + '/qyrelatedcomplaint'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntirehelpdeskURL + '/qyrelatedcomplaint')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

