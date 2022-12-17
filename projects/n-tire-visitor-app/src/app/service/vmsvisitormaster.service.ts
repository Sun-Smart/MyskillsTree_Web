import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { vmsvisitormaster } from '../model/vmsvisitormaster.model';
import { environment } from '../../environments/environment';
import { IvmsvisitormasterResponse } from '../model/vmsvisitormaster.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class vmsvisitormasterService {
  formData: vmsvisitormaster;
  readonly rootURL = AppConstants.baseURL;
  list: vmsvisitormaster[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatevmsvisitormasters():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
    };
    return this.http.post(AppConstants.ntirevisitorURL + '/vmsvisitormaster', body);
  }
  }

  saveOrUpdatevmsvisitormastersList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntirevisitorURL + '/vmsvisitormaster', body);
  }
  }

  getvmsvisitormastersList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirevisitorURL + '/vmsvisitormaster').toPromise();
  }
  }
  getListByvisitormasterid(visitormasterid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirevisitorURL + '/vmsvisitormaster'+'/visitormasterid/'+visitormasterid).toPromise();
  }
  }

  getListByemailaddress(emailaddress:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirevisitorURL + '/vmsvisitormaster'+'/emailaddress/'+emailaddress).toPromise();
  }
  }

  getListByphone(phone:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirevisitorURL + '/vmsvisitormaster'+'/phone/'+phone).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirevisitorURL + '/vmsvisitormaster'+'/param/'+key).toPromise();
  }
  }


  getvmsvisitormastersByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirevisitorURL + '/vmsvisitormaster'+'/e/'+id).toPromise();
  }
  }
  getvmsvisitormastersByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntirevisitorURL + '/vmsvisitormaster'+'/'+id).toPromise();
  }
  }

  deletevmsvisitormaster(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntirevisitorURL + '/vmsvisitormaster'+'/'+id).toPromise();
  }
  }
clearList(){
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntirevisitorURL + '/vmsvisitormaster')
.toPromise()
.then(res => this.list = res as any[]);
}
}


}

