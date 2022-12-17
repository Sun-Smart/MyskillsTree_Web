import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { hrmsinterviewscoring } from '../model/hrmsinterviewscoring.model';
import { environment } from '../../environments/environment';
import { IhrmsinterviewscoringResponse } from '../model/hrmsinterviewscoring.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class hrmsinterviewscoringService {
  formData: hrmsinterviewscoring;
  readonly rootURL = AppConstants.baseURL;
  list: hrmsinterviewscoring[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatehrmsinterviewscorings():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntirehrmsURL + '/hrmsinterviewscoring', body);
  }
  }

  saveOrUpdatehrmsinterviewscoringsList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntirehrmsURL + '/hrmsinterviewscoring', body);
  }
  }

  gethrmsinterviewscoringsList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsinterviewscoring').toPromise();
  }
  }
  getListByscoringid(scoringid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsinterviewscoring'+'/scoringid/'+scoringid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsinterviewscoring'+'/param/'+key).toPromise();
  }
  }


  gethrmsinterviewscoringsByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsinterviewscoring'+'/e/'+id).toPromise();
  }
  }
  gethrmsinterviewscoringsByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsinterviewscoring'+'/'+id).toPromise();
  }
  }

  deletehrmsinterviewscoring(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntirehrmsURL + '/hrmsinterviewscoring'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntirehrmsURL + '/hrmsinterviewscoring')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

