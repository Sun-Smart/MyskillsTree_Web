import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { hrmsemployeetransfer } from '../model/hrmsemployeetransfer.model';
import { environment } from '../../environments/environment';
import { IhrmsemployeetransferResponse } from '../model/hrmsemployeetransfer.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class hrmsemployeetransferService {
  formData: hrmsemployeetransfer;
  readonly rootURL = AppConstants.baseURL;
  list: hrmsemployeetransfer[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatehrmsemployeetransfers():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntirehrmsURL + '/hrmsemployeetransfer', body);
  }
  }

  saveOrUpdatehrmsemployeetransfersList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntirehrmsURL + '/hrmsemployeetransfer', body);
  }
  }

  gethrmsemployeetransfersList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeetransfer').toPromise();
  }
  }
  getListBytransferid(transferid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeetransfer'+'/transferid/'+transferid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeetransfer'+'/param/'+key).toPromise();
  }
  }


  gethrmsemployeetransfersByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeetransfer'+'/e/'+id).toPromise();
  }
  }
  gethrmsemployeetransfersByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeetransfer'+'/'+id).toPromise();
  }
  }

  deletehrmsemployeetransfer(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntirehrmsURL + '/hrmsemployeetransfer'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeetransfer')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

