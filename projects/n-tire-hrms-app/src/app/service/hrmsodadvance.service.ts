import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { hrmsodadvance } from '../model/hrmsodadvance.model';
import { environment } from '../../environments/environment';
import { IhrmsodadvanceResponse } from '../model/hrmsodadvance.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class hrmsodadvanceService {
  formData: hrmsodadvance;
  readonly rootURL = AppConstants.baseURL;
  list: hrmsodadvance[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatehrmsodadvances():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntirehrmsURL + '/hrmsodadvance', body);
  }
  }

  saveOrUpdatehrmsodadvancesList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntirehrmsURL + '/hrmsodadvance', body);
  }
  }

  gethrmsodadvancesList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsodadvance').toPromise();
  }
  }
  getListByodadvanceid(odadvanceid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsodadvance'+'/odadvanceid/'+odadvanceid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsodadvance'+'/param/'+key).toPromise();
  }
  }


  gethrmsodadvancesByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsodadvance'+'/e/'+id).toPromise();
  }
  }
  gethrmsodadvancesByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsodadvance'+'/'+id).toPromise();
  }
  }

  deletehrmsodadvance(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntirehrmsURL + '/hrmsodadvance'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntirehrmsURL + '/hrmsodadvance')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

