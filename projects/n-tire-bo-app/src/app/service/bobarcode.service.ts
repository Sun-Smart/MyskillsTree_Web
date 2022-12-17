import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { bobarcode } from '../model/bobarcode.model';
import { environment } from '../../environments/environment';
import { IbobarcodeResponse } from '../model/bobarcode.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../shared/helper'
import { SessionService } from '../pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class bobarcodeService {
  formData: bobarcode;
  readonly rootURL = AppConstants.baseURL;
  list: bobarcode[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatebobarcodes():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntireboURL + '/bobarcode', body);
  }
  }

  saveOrUpdatebobarcodesList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntireboURL + '/bobarcode', body);
  }
  }

  getbobarcodesList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/bobarcode').toPromise();
  }
  }
  getListBybarcodeid(barcodeid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/bobarcode'+'/barcodeid/'+barcodeid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/bobarcode'+'/param/'+key).toPromise();
  }
  }


  getbobarcodesByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/bobarcode'+'/e/'+id).toPromise();
  }
  }
  getbobarcodesByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/bobarcode'+'/'+id).toPromise();
  }
  }

  deletebobarcode(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntireboURL + '/bobarcode'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntireboURL + '/bobarcode')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

