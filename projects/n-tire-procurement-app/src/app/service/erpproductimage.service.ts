import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { erpproductimage } from '../model/erpproductimage.model';
import { environment } from '../../environments/environment';
import { IerpproductimageResponse } from '../model/erpproductimage.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class erpproductimageService {
  formData: erpproductimage;
  readonly rootURL = AppConstants.baseURL;
  list: erpproductimage[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdateerpproductimages():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntireprocurementURL + '/erpproductimage', body);
  }
  }

  saveOrUpdateerpproductimagesList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntireprocurementURL + '/erpproductimage', body);
  }
  }

  geterpproductimagesList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erpproductimage').toPromise();
  }
  }
  getListByimageid(imageid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erpproductimage'+'/imageid/'+imageid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erpproductimage'+'/param/'+key).toPromise();
  }
  }


  geterpproductimagesByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erpproductimage'+'/e/'+id).toPromise();
  }
  }
  geterpproductimagesByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireprocurementURL + '/erpproductimage'+'/'+id).toPromise();
  }
  }

  deleteerpproductimage(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntireprocurementURL + '/erpproductimage'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntireprocurementURL + '/erpproductimage')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

