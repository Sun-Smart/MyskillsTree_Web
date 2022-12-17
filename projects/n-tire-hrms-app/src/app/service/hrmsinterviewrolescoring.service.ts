import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { hrmsinterviewrolescoring } from '../model/hrmsinterviewrolescoring.model';
import { environment } from '../../environments/environment';
import { IhrmsinterviewrolescoringResponse } from '../model/hrmsinterviewrolescoring.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class hrmsinterviewrolescoringService {
  formData: hrmsinterviewrolescoring;
  readonly rootURL = AppConstants.baseURL;
  list: hrmsinterviewrolescoring[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatehrmsinterviewrolescorings():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntirehrmsURL + '/hrmsinterviewrolescoring', body);
  }
  }

  saveOrUpdatehrmsinterviewrolescoringsList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntirehrmsURL + '/hrmsinterviewrolescoring', body);
  }
  }

  gethrmsinterviewrolescoringsList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsinterviewrolescoring').toPromise();
  }
  }
  getListByuserrolescoringid(userrolescoringid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsinterviewrolescoring'+'/userrolescoringid/'+userrolescoringid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsinterviewrolescoring'+'/param/'+key).toPromise();
  }
  }


  gethrmsinterviewrolescoringsByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsinterviewrolescoring'+'/e/'+id).toPromise();
  }
  }
  gethrmsinterviewrolescoringsByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsinterviewrolescoring'+'/'+id).toPromise();
  }
  }

  deletehrmsinterviewrolescoring(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntirehrmsURL + '/hrmsinterviewrolescoring'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntirehrmsURL + '/hrmsinterviewrolescoring')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

