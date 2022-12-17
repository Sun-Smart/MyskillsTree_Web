import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { hrmsapplicantoffer } from '../model/hrmsapplicantoffer.model';
import { environment } from '../../environments/environment';
import { IhrmsapplicantofferResponse } from '../model/hrmsapplicantoffer.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class hrmsapplicantofferService {
  formData: hrmsapplicantoffer;
  readonly rootURL = AppConstants.baseURL;
  list: hrmsapplicantoffer[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatehrmsapplicantoffers():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntirehrmsURL + '/hrmsapplicantoffer', body);
  }
  }

  saveOrUpdatehrmsapplicantoffersList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntirehrmsURL + '/hrmsapplicantoffer', body);
  }
  }

  gethrmsapplicantoffersList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsapplicantoffer').toPromise();
  }
  }
  getListByofferid(offerid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsapplicantoffer'+'/offerid/'+offerid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsapplicantoffer'+'/param/'+key).toPromise();
  }
  }


  gethrmsapplicantoffersByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsapplicantoffer'+'/e/'+id).toPromise();
  }
  }
  gethrmsapplicantoffersByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsapplicantoffer'+'/'+id).toPromise();
  }
  }

  deletehrmsapplicantoffer(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntirehrmsURL + '/hrmsapplicantoffer'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntirehrmsURL + '/hrmsapplicantoffer')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

