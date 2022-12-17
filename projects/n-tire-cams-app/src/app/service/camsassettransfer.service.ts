import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { camsassettransfer } from '../model/camsassettransfer.model';
import { camsassettransferdetail } from '../model/camsassettransferdetail.model';
import { environment } from '../../environments/environment';
import { IcamsassettransferResponse } from '../model/camsassettransfer.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class camsassettransferService {
  formData: camsassettransfer;
  readonly rootURL = AppConstants.baseURL;
  list: camsassettransfer[];
  camsassettransferdetails: camsassettransferdetail[]=[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatecamsassettransfers():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
      camsassettransferdetails: this.camsassettransferdetails.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
    };
    return this.http.post(AppConstants.ntirecamsURL + '/camsassettransfer', body);
  }
  }

  saveOrUpdatecamsassettransfersList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntirecamsURL + '/camsassettransfer', body);
  }
  }

  getcamsassettransfersList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecamsURL + '/camsassettransfer').toPromise();
  }
  }
  getListBytransferid(transferid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecamsURL + '/camsassettransfer'+'/transferid/'+transferid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecamsURL + '/camsassettransfer'+'/param/'+key).toPromise();
  }
  }


  getcamsassettransfersByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecamsURL + '/camsassettransfer'+'/e/'+id).toPromise();
  }
  }
  getcamsassettransfersByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirecamsURL + '/camsassettransfer'+'/'+id).toPromise();
  }
  }

  deletecamsassettransfer(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntirecamsURL + '/camsassettransfer'+'/'+id).toPromise();
  }
  }
clearList(){
this.camsassettransferdetails = [];
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntirecamsURL + '/camsassettransfer')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

