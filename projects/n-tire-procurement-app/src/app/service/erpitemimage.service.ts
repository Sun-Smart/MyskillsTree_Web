import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { erpitemimage } from '../model/erpitemimage.model';
import { environment } from '../../environments/environment';
import { IerpitemimageResponse } from '../model/erpitemimage.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class erpitemimageService {
  formData: erpitemimage;
  readonly rootURL = AppConstants.baseURL;
  list: erpitemimage[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdateerpitemimages():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntireprocurementURL + '/erpitemimage', body);
  }
  }

  saveOrUpdateerpitemimagesList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntireprocurementURL + '/erpitemimage', body);
  }
  }

  geterpitemimagesList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erpitemimage').toPromise();
  }
  }
  getListByimageid(imageid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erpitemimage'+'/imageid/'+imageid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erpitemimage'+'/param/'+key).toPromise();
  }
  }


  geterpitemimagesByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erpitemimage'+'/e/'+id).toPromise();
  }
  }
  geterpitemimagesByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erpitemimage'+'/'+id).toPromise();
  }
  }

  deleteerpitemimage(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntireprocurementURL + '/erpitemimage'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntireprocurementURL + '/erpitemimage')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

