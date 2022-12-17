import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { hrmsinterviewscoringsdel } from '../model/hrmsinterviewscoringsdel.model';
import { environment } from '../../environments/environment';
import { IhrmsinterviewscoringsdelResponse } from '../model/hrmsinterviewscoringsdel.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class hrmsinterviewscoringsdelService {
  formData: hrmsinterviewscoringsdel;
  readonly rootURL = AppConstants.baseURL;
  list: hrmsinterviewscoringsdel[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatehrmsinterviewscoringsDEL():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntirehrmsURL + '/hrmsinterviewscoringsdel', body);
  }
  }

  saveOrUpdatehrmsinterviewscoringsDELList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntirehrmsURL + '/hrmsinterviewscoringsdel', body);
  }
  }

  gethrmsinterviewscoringsDELList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsinterviewscoringsdel').toPromise();
  }
  }
  getListByscoringid(scoringid:):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsinterviewscoringsdel'+'/scoringid/'+scoringid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsinterviewscoringsdel'+'/param/'+key).toPromise();
  }
  }


  gethrmsinterviewscoringsDELByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsinterviewscoringsdel'+'/e/'+id).toPromise();
  }
  }
  gethrmsinterviewscoringsDELByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsinterviewscoringsdel'+'/'+id).toPromise();
  }
  }

  deletehrmsinterviewscoringsDEL(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntirehrmsURL + '/hrmsinterviewscoringsdel'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntirehrmsURL + '/hrmsinterviewscoringsDEL')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

