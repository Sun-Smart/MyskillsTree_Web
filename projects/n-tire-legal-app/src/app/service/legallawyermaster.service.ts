import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { legallawyermaster } from '../model/legallawyermaster.model';
import { legallawyercourt } from '../model/legallawyercourt.model';
import { environment } from '../../environments/environment';
import { IlegallawyermasterResponse } from '../model/legallawyermaster.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class legallawyermasterService {
  formData: legallawyermaster;
  readonly rootURL = AppConstants.baseURL;
  list: legallawyermaster[];
  legallawyercourts: legallawyercourt[]=[];
  Insertlegallawyercourts: legallawyercourt[]=[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatelegallawyermasters():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
      legallawyercourts: this.Insertlegallawyercourts.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
    };
    return this.http.post(AppConstants.ntirelegalURL + '/legallawyermaster', body);
  }
  }

  saveOrUpdatelegallawyermastersList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntirelegalURL + '/legallawyermaster', body);
  }
  }

  getlegallawyermastersList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirelegalURL + '/legallawyermaster').toPromise();
  }
  }
  getListBylawyerid(lawyerid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirelegalURL + '/legallawyermaster'+'/lawyerid/'+lawyerid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirelegalURL + '/legallawyermaster'+'/param/'+key).toPromise();
  }
  }


  getlegallawyermastersByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirelegalURL + '/legallawyermaster'+'/e/'+id).toPromise();
  }
  }
  getlegallawyermastersByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirelegalURL + '/legallawyermaster'+'/'+id).toPromise();
  }
  }

  deletelegallawyermaster(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntirelegalURL + '/legallawyermaster'+'/'+id).toPromise();
  }
  }
clearList(){
this.legallawyercourts = [];
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntirelegalURL + '/legallawyermaster')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

