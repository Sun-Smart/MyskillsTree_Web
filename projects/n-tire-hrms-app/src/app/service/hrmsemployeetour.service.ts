import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { hrmsemployeetour } from '../model/hrmsemployeetour.model';
import { environment } from '../../environments/environment';
import { IhrmsemployeetourResponse } from '../model/hrmsemployeetour.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class hrmsemployeetourService {
  formData: hrmsemployeetour;
  readonly rootURL = AppConstants.baseURL;
  list: hrmsemployeetour[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatehrmsemployeetours():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntirehrmsURL + '/hrmsemployeetour', body);
  }
  }

  saveOrUpdatehrmsemployeetoursList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntirehrmsURL + '/hrmsemployeetour', body);
  }
  }

  gethrmsemployeetoursList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeetour').toPromise();
  }
  }
  getListByvisitid(visitid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeetour'+'/visitid/'+visitid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeetour'+'/param/'+key).toPromise();
  }
  }


  gethrmsemployeetoursByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeetour'+'/e/'+id).toPromise();
  }
  }
  gethrmsemployeetoursByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeetour'+'/'+id).toPromise();
  }
  }

  deletehrmsemployeetour(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntirehrmsURL + '/hrmsemployeetour'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeetour')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

