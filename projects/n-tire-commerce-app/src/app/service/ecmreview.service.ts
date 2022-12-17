import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ecmreview } from '../model/ecmreview.model';
import { environment } from '../../environments/environment';
import { IecmreviewResponse } from '../model/ecmreview.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class ecmreviewService {
  formData: ecmreview;
  readonly rootURL = AppConstants.baseURL;
  list: ecmreview[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdateecmreviews():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntirecommerceURL + '/ecmreview', body);
  }
  }

  saveOrUpdateecmreviewsList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntirecommerceURL + '/ecmreview', body);
  }
  }

  getecmreviewsList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecommerceURL + '/ecmreview').toPromise();
  }
  }
  getListByreviewid(reviewid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecommerceURL + '/ecmreview'+'/reviewid/'+reviewid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecommerceURL + '/ecmreview'+'/param/'+key).toPromise();
  }
  }


  getecmreviewsByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecommerceURL + '/ecmreview'+'/e/'+id).toPromise();
  }
  }
  getecmreviewsByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecommerceURL + '/ecmreview'+'/'+id).toPromise();
  }
  }

  deleteecmreview(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntirecommerceURL + '/ecmreview'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntirecommerceURL + '/ecmreview')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

